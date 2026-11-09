
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 min-h-screen bg-black text-white">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

 
