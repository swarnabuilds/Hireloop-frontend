import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
    inferAdditionalFields<typeof auth>(), // এটি additionalFields (যেমন: role) অটোমেটিক ক্লায়েন্টে টাইপ-সেফ করে
  ],
})
export const { signIn, signUp, useSession } = authClient