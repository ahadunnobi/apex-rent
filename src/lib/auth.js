import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { getAuthBaseURL, getTrustedOrigins } from "@/lib/auth-url";

if (!process.env.MONGODB) {
  console.error("MONGODB is not set — login and signup will fail.");
}

const client = new MongoClient(process.env.MONGODB || "", {
  serverSelectionTimeoutMS: 15000,
});
const db = client.db("apexRentDB");

const authBaseURL = getAuthBaseURL();

export const auth = betterAuth({
  baseURL: authBaseURL,
  trustedOrigins: getTrustedOrigins(),
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          email: user?.email,
          name: user?.name,
        }),
      },
    }),
  ],
  user: {
    additionalFields: {
      photo: {
        type: "string",
        required: false,
      },
    },
  },
});
