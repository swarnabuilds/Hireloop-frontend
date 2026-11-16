import { headers } from "next/headers"
import { auth } from "../auth"



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