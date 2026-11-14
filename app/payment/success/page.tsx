import { paymentCheckoutVerify } from '@/lib/actions/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    payment_status,
    customer_email,
    amount_total,
    currency,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status === 'paid') {
    // Call payment verification API
    await paymentCheckoutVerify(session_id)

    // Safely extract Transaction ID (payment_intent.id)
    const transactionId =
      typeof payment_intent === 'string'
        ? payment_intent
        : payment_intent?.id ?? 'N/A'

    const formattedAmount = amount_total
      ? `${(amount_total / 100).toFixed(2)} ${currency?.toUpperCase()}`
      : 'Paid'

    return (
      <section
        id="success"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12"
      >
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg p-8 text-center">
          {/* Success Checkmark Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Payment Successful!
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Thank you for upgrading to Pro. Your account benefits are now active.
          </p>

          {/* Payment Details Card */}
          <div className="mt-6 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 p-4 text-left space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
                Transaction ID
              </span>
              <span className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">
                Amount Paid
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formattedAmount}
              </span>
            </div>

            {customer_email && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
                  Receipt Email
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {customer_email}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Status</span>
              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400 capitalize">
                {payment_status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/browse-jobs"
              className="w-full inline-flex justify-center items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>
            <Link
              href="/dashboard"
              className="w-full inline-flex justify-center items-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Go to Dashboard
            </Link>
          </div>

          <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
            Questions? Contact us at{' '}
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </div>
      </section>
    )
  }

  return redirect('/')
}