import { Navbar } from "@/components/home/Home";
import { IsAuthenticated } from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticated>
      <div className="relative mx-auto  flex  flex-col items-center justify-center mb-2">
        <Navbar />
      </div>

      {children}
    </IsAuthenticated>
  );
}
