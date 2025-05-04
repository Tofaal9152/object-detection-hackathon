import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import SidebarNavbar from "@/components/dashboard/AppSidebar/SidebarNavbar";
import { ParticleBackground } from "@/components/ui/particle-background";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {IsAuthenticated} from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticated>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarNavbar />
          {children}
          <ParticleBackground />
        </SidebarInset>
      </SidebarProvider>
    </IsAuthenticated>
  );
}

