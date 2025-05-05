import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebarHeader() {
  const activeTeam = {
    name: "🟢 Live!",
    logo: "/login.webp",
    plan: "Back",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Image
              src={activeTeam.logo}
              width={32}
              height={32}
              alt="logo"
              className="rounded-md"
            />
            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <span className="truncate text-xs ">
                {/* <ArrowLeft size={16} className="inline-block mr-1" />
                {activeTeam.plan} */}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
