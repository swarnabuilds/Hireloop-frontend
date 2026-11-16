
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL


export const getPremiumUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URI}/users/${userId}/premium`)
  return response.json()
}



export const requreRole = async(role: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session || session?.user?.role !== role){
    redirect("/unauthorized")
  }
  return session
}