import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const SERVER_URL = (
  process.env.SERVER_URL || "http://localhost:5000"
).replace(/\/$/, "");

function isPublicRoute(method, pathSegments) {
  const path = pathSegments.join("/");
  if (method === "GET" && path === "cars") return true;
  if (method === "GET" && /^cars\/[^/]+$/.test(path)) return true;
  return false;
}

/** Get JWT via Better Auth server API (reliable — no extra HTTP hop) */
async function getJwtToken() {
  try {
    const hdrs = await headers();
    const session = await auth.api.getSession({ headers: hdrs });
    if (!session?.user) return null;

    const result = await auth.api.getToken({ headers: hdrs });
    return result?.token || null;
  } catch (error) {
    console.error("getJwtToken error:", error.message);
    return null;
  }
}

async function handler(req, { params }) {
  const { path: pathSegments } = await params;
  const targetPath = "/" + pathSegments.join("/");
  const url = new URL(req.url);
  const queryString = url.search;

  const fetchHeaders = { "Content-Type": "application/json" };

  if (!isPublicRoute(req.method, pathSegments)) {
    const token = await getJwtToken();
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method: req.method,
    headers: fetchHeaders,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      const body = await req.text();
      if (body) fetchOptions.body = body;
    } catch {
      /* no body */
    }
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const backendRes = await fetch(
      `${SERVER_URL}${targetPath}${queryString}`,
      { ...fetchOptions, signal: controller.signal }
    );

    clearTimeout(timeout);

    const data = await backendRes.text();
    return new NextResponse(data, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error.message);
    return NextResponse.json(
      { message: "Cannot reach car API. Check SERVER_URL and that the server is running." },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
