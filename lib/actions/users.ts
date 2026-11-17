"use server"
import { protectedMutation } from "../core/server";

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL


export const updateUserRole = async (userId: string, role: string) => {
  const api = `${BASE_URI}/users/${userId}/role`;
  const response = await protectedMutation(api, "PATCH", { role })
    return response.json(); 
};


