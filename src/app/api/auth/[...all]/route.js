import { auth } from "@/lib/auth"; // import the auth instance
import { toNextJsHandler } from "better-auth/next-js"; // import Next.js handler

export const { GET, POST } = toNextJsHandler(auth);
