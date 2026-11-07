import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI as string)
const db = client.db("hireloopdb")

export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

   user: {
  additionalFields: {
    role: {
      type: "string", // ডাটাবেজে স্ট্রিং হিসেবে সেভ হবে
      required: false,
      defaultValue: "seeker",
      input: true, // ক্লায়েন্ট (Sign Up Form) থেকে ডাটা রিসিভ করার অনুমতি
    },
  },
},

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    },  
  },
  
  database: mongodbAdapter(db, {
    client,
  }),
})
