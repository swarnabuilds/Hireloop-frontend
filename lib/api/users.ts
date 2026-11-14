const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPremiumUserById = async(userId: string) =>{
    const response = await fetch(`${BASE_URI}/users/${userId}/premium`)
    return response.json()
}