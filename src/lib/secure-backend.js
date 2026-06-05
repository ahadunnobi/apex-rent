"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const SERVER_URL = (
  process.env.SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");

const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

async function getSessionUser() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session?.user?.email) {
    throw new Error("Please log in again.");
  }
  return session.user;
}

/** Server-side calls to Express with trusted user headers (no JWT/JWKS required). */
export async function secureBackendFetch(path, options = {}) {
  if (!INTERNAL_API_SECRET) {
    throw new Error(
      "INTERNAL_API_SECRET is not set on the Next.js app. Add it in Vercel/VocalHost env vars."
    );
  }

  const user = await getSessionUser();

  const res = await fetch(`${SERVER_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": INTERNAL_API_SECRET,
      "x-user-email": user.email,
      "x-user-name": user.name || user.email.split("@")[0],
      "x-user-id": user.id || "",
      ...options.headers,
    },
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid response from car API.");
  }

  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed (${res.status})`);
  }

  return data;
}
