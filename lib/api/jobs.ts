

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;


//get all job
export const getJobs = async (query = '') => {
    const res = await fetch(`${BASE_URI}/jobs?${query}`)
    return res.json()
}



