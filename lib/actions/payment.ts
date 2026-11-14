const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

export const paymentCheckoutVerify = async(sessionId: string) => {
    const response = await fetch(`${BASE_URI}/payments/checkout-verify`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
    })

    return response.json()
}