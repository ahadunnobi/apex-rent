/** Resolve the public app URL for Better Auth (server + client). */
export function getAuthBaseURL() {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  if (process.env.CLIENT_URL) {
    return process.env.CLIENT_URL.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function getTrustedOrigins() {
  const origins = new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    getAuthBaseURL(),
  ]);

  for (const value of [
    process.env.CLIENT_URL,
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
  ]) {
    if (value) origins.add(value.replace(/\/$/, ""));
  }

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  return [...origins];
}
