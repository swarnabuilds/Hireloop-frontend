import "server-only"
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"


//DSHBOAD ROUTE SECURE SEKKER CAN NOT ACCESS ADMIN RECRUITER DASHBOARD PAGE AS SAME AS ADMIN RECRUITER

export const requreRole = async (role: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session?.user?.role !== role) {
    redirect("/unauthorized");
  }
  return session;
};

export const getSession = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
      })
     return session 
}


export const getToken = async () => {
    const session = await getSession();
    const token = session?.session?.token;

    if (!session || !token) {
        redirect("/unauthorized");
    }
    return token;
};


// send token server for authentication 
export const authFetch = async(api: string) => {
    const token = await getToken()
    const res = await fetch(api, {
        headers : {
            authorization : `Bearer ${token}`,
        }
    })
     if(res.status === 401 || res.status === 403) {
        redirect("/unathorized")
    }
    return res
}


export const protectedMutation = async(api: string, method: string, data?: unknown) => {
    const token = await getToken()
    const res = await fetch(api, {
        method: method,
        headers: {
            'Content-type' : 'application/json',
            authorization: `Bearer ${token}`
        },
        body: data? JSON.stringify(data):null
    })
    if(res.status === 401 || res.status === 403) {
        redirect("/unathorized")
    }
    return res;
}

// export const authFetch = async (api: string, options: RequestInit = {}) => {
//   const token = await getToken();
//   const res = await fetch(api, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//       authorization: `Bearer ${token}`,
//     },
//   });
//   return res;
// };