
const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL


export const updateUserRole = async (userId: string, role: string) => {
  
    const res = await fetch(`${BASE_URI}/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    return res.json(); 
};


