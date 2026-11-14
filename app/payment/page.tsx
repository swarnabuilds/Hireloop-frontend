import { CreditCard, ShieldCheck } from "lucide-react";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center mx-auto border border-blue-500/20">
            <CreditCard className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Upgrade to Pro</h1>
          <p className="text-xs text-slate-400">
            You have reached your 10 free applications limit. Pay to continue applying for jobs.
          </p>
        </div>

        {/* Pricing Summary Box */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Plan</span>
            <span className="font-semibold text-white">Unlimited Applications</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Price</span>
            <span className="font-semibold text-emerald-400">$10.00 / month</span>
          </div>
          <hr className="border-slate-800" />
          <div className="flex justify-between text-base font-bold">
            <span>Total Due</span>
            <span className="text-blue-400">$10.00</span>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Secure checkout powered by Stripe. Your card details are encrypted.</span>
        </div>

        {/* Stripe Form Action */}
        <form action="/api/checkout_sessions" method="POST">
          <button
            type="submit"
            role="link"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <span>Proceed to Stripe Payment</span>
          </button>
        </form>

      </div>
    </div>
  );
}