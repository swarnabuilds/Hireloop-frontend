import { headers } from "next/headers"
import { auth } from "../auth"

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL


// for admin pannel role based 

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })
  return users
}

export const getPremiumUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URI}/users/${userId}/premium`)
  return response.json()
}
