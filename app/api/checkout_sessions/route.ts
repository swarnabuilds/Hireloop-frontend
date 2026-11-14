import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";  

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Better Auth থেকে সেশন ও ইউজার বের করা
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create Checkout Sessions from body params.
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to quota
          price: 'price_1UbZRg2IfgaWUYZdY2aDnAmJ',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: session?.user?.email, // সেশন থেকে ইউজারের ইমেল বসানো হলো[cite: 11]
      metadata: {
        userId: session?.user?.id
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?canceled=true`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and
      integration_identifier: 'hire_loop_web_0001',
    });
    
    return NextResponse.redirect(stripeSession.url as string, 303);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}