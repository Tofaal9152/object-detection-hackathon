import BorderGlow from "@/components/ui/BorderGlow";
import {IsAuthenticated} from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticated>
      <section className="flex flex-col items-center justify-center h-screen ">
        <div className="container relative mx-auto p-4  bg-white dark:bg-black/40  border shadow-md z-10 h-full m-4 ">
          <BorderGlow />

          {children}
        </div>
      </section>
    </IsAuthenticated>
  );
}
