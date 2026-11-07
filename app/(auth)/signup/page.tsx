"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, User, Briefcase, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ইনপুট ফিল্ডের কমন স্টাইল (ব্রাউজারের autofill ব্যাকগ্রাউন্ড হ্যান্ডেল করার জন্য)
  const inputStyle =
    "h-11 rounded-xl border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 autofill:shadow-[0_0_0_30px_#18181b_inset] autofill:[-webkit-text-fill-color:#ffffff]"

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        role: role as any,
        callbackURL: "/signin",
      },
      {
        onSuccess: () => {
          setLoading(false)
          toast.success("Account created successfully!", {
            description: `Registered as ${role.toUpperCase()}.`,
          })
          router.push("/signin")
        },
        onError: (ctx) => {
          setLoading(false)
          const errorMsg = ctx.error.message || "Something went wrong during sign up."
          setError(errorMsg)
          toast.error("Sign up failed", {
            description: errorMsg,
          })
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-12 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl backdrop-blur-md">
        
        {/* Logo / Brand */}
        <div className="mb-6 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Hireloop"
              width={130}
              height={36}
              priority
              className="mx-auto h-auto w-32"
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Select your role to personalize your experience.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">

          {/* Role Selection Tabs */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Select Account Type
            </Label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              
              {/* Seeker Option */}
              <button
                type="button"
                onClick={() => setRole("seeker")}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                  role === "seeker"
                    ? "border-indigo-500 bg-indigo-600/15 text-indigo-300 ring-1 ring-indigo-500"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <User className="size-5" />
                <span className="text-xs font-semibold">Seeker</span>
              </button>

              {/* Recruiter Option */}
              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                  role === "recruiter"
                    ? "border-indigo-500 bg-indigo-600/15 text-indigo-300 ring-1 ring-indigo-500"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <Briefcase className="size-5" />
                <span className="text-xs font-semibold">Recruiter</span>
              </button>

              {/* Admin Option */}
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                  role === "admin"
                    ? "border-indigo-500 bg-indigo-600/15 text-indigo-300 ring-1 ring-indigo-500"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <ShieldCheck className="size-5" />
                <span className="text-xs font-semibold">Admin</span>
              </button>

            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Swarna Sutradhar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
              Password
            </Label>
            
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${inputStyle} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-indigo-600 font-medium text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              `Sign Up as ${role.charAt(0).toUpperCase() + role.slice(1)}`
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}