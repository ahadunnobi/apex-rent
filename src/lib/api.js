// Client-side API calls go through the Next.js proxy route
// which forwards them to the Express backend with the JWT token injected.

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  // Route through our Next.js proxy so the JWT is injected server-side
  const res = await fetch(`/api/proxy${path}`, {
    ...options,
    credentials: "include", // sends Better Auth session cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data;
}

export function getGoogleAuthUrl() {
  return `/api/auth/sign-in/social?provider=google`;
}

export { SERVER_URL as API };
