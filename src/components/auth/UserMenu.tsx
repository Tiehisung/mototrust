// src/components/layout/UserMenu.tsx

import { useNavigate } from "react-router-dom";
import { Dropdown } from "../headlessUI/Dropdown";
import { Button } from "../buttons/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store";
import { Settings, User } from "lucide-react";

import { PiSignOut } from "react-icons/pi";
import { logout } from "@/store/slices/auth.slice";
import { adminQuickLinks } from "@/pages/admin/AdminLayout";
import {
  buyerDashboardQuickLinks,
  sellerDashboardQuickLinks,
} from "@/pages/dashboard/Layout";
import { useTheme } from "@/contexts/ThemContext";
import { MdOutlineWbSunny } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";

export function UserMenu() {
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const dispatch = useAppDispatch();

  const path = user?.role === "admin" ? "/admin" : "/dashboard";

  const quicklinks =
    user?.role === "admin"
      ? adminQuickLinks
      : user?.role == "seller"
        ? sellerDashboardQuickLinks
        : buyerDashboardQuickLinks;

  const menuItems = [
    {
      label: "My Shop",
      href: path,
      icon: <User className="w-5 h-5" />,
    },
    ...quicklinks,
    {
      label: "Settings",
      href: `${path}/profile`,
      icon: <Settings className="w-5 h-5" />,
    },
    {
      label: `${theme[0].toUpperCase() + theme.substring(1)} Mode`,

      icon:
        theme == "dark" ? (
          <RiMoonClearLine className="w-5 h-5" />
        ) : (
          <MdOutlineWbSunny className="w-5 h-5" />
        ),
      onClick: () => setTheme(theme == "dark" ? "light" : "dark"),
    },
    {
      label: "Sign Out",
      onClick: () => dispatch(logout()),
      icon: <PiSignOut className="w-5 h-5" />,
      danger: true,
    },
  ];

  if (!user) {
    return (
      <Button
        onClick={() => navigate("/auth/signin")}
        className="flex items-center space-x-2 px-4 py-2 brand text-white rounded-lg hover:bg-brand/75"
      >
        <User className="w-5 h-5 max-sm:hidden" />
        <span>Sign In</span>
      </Button>
    );
  }
  return (
    <Dropdown
      trigger={
        <button className="flex items-center space-x-1 border border-primary pr-1.5 rounded-full cursor-pointer hover:bg-card">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white uppercase">
            {user?.fullName?.[0] || "U"}
          </div>
          <span className=" md:block text-sm text-muted-foreground">
            {
              "Menu"
              // || user?.fullName?.split(" ")?.[0] ||
              //   user?.phoneNumber?.substring(7) ||
              //   "User"
            }
          </span>
        </button>
      }
      items={menuItems}
      position="right"
      width="md"
    />
  );
}
