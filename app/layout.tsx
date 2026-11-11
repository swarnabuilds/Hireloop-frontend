import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/Navbar"


import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="bg-[#0f172a] text-slate-100">
              <Navbar />
        {children}
        <Toaster/>
        </body>
    </html>
  )
}
