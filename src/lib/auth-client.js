import { createAuthClient } from "better-auth/react";

/**
 * Must match the site origin the user is on.
 * NEXT_PUBLIC_APP_URL is set per environment (local vs Vercel).
 */
const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  undefined;

export const authClient = createAuthClient({
  baseURL,
});
