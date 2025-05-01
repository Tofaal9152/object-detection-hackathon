import { IsAuthenticatedInDashboard } from "@/hooks/isAuthenticated";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import SidebarNavbar from "@/components/dashboard/AppSidebar/SidebarNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ParticleBackground } from "@/components/ui/particle-background";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticatedInDashboard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarNavbar />
          {children}
          <ParticleBackground />
        </SidebarInset>
      </SidebarProvider>
    </IsAuthenticatedInDashboard>
  );
}

