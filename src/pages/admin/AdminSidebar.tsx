import { LogoutBtn } from "@/pages/auth/LogoutButton";
import { ThemeModeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import {
  PrimaryAdminSidebar,
  SidebarLink,
  sidebarLinks,
} from "./(sidebar)/PrimarySidebarAdmin";
import { AVATAR } from "@/components/ui/avatar";
import { ENV } from "@/lib/env";
import { GlassmorphicGradient } from "@/components/Glasmorphic/Gradient";
import { POPOVER } from "@/components/ui/popover";
import { Menu } from "lucide-react";

export function LeftPaneDesktop() {
  return (
    <div className="max-md:hidden bg-accent max-h-screen overflow-y-auto py-6">
      <div className="p-6 flex items-center gap-6 justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold grow flex gap-2 items-center"
          title="Home"
        >
          <AVATAR src={ENV.LOGO_NO_BG_URL} /> {ENV.TEAM_ALIAS}
        </Link>
        <ThemeModeToggle />
      </div>

      <PrimaryAdminSidebar />

      <footer className="flex flex-wrap p-3 items-center gap-3.5 justify-between border-t border-secondary-foreground/20">
        <LogoutBtn text="Logout" className="grow" />
      </footer>
    </div>
  );
}

export function LeftPaneMobileHeadless() {
  return (
    <POPOVER
      align="start"
      trigger={<Menu />}
      triggerClassNames="md:hidden"
      className="w-fit relative p-0"
    >
      <GlassmorphicGradient className="w-full relative p-2">
        <div className=" mt-2 px-2 py-1 flex gap-6 items-center  rounded-full ">
          <ThemeModeToggle className="w-full" />
          <LogoutBtn />
        </div>
        <div>
          {sidebarLinks.map((link, i) => (
            <SidebarLink key={i} item={link} />
          ))}
        </div>
      </GlassmorphicGradient>
    </POPOVER>
  );
}
