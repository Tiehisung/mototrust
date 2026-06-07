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

export function UserMenu() {
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const path = user?.role === "admin" ? "/admin" : "/dashboard";

  const quicklinks =
    user?.role === "admin"
      ? adminQuickLinks
      : user?.role == "seller"
        ? sellerDashboardQuickLinks
        : buyerDashboardQuickLinks;

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

  const menuItems = [
    {
      label: "My Shop",
      href: path,
      icon: <User className="w-4 h-4" />,
    },
    ...quicklinks,
    {
      label: "Settings",
      href: `${path}/profile`,
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Sign Out",
      onClick: () => dispatch(logout()),
      icon: <PiSignOut className="w-4 h-4" />,
      danger: true,
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white uppercase">
            {user.fullName?.[0] || "U"}
          </div>
          <span className="hidden md:block">
            {user.fullName?.split(" ")?.[0] ||
              user.phoneNumber?.substring(7) ||
              "User"}
          </span>
        </button>
      }
      items={menuItems}
      position="right"
      width="md"
    />
  );
}
