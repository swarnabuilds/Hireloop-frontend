import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"

export default function Page() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-black">
      <Navbar />
      <Hero />
    </div>
  )
}
