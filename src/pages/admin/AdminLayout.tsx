import { Outlet, NavLink, Link } from "react-router-dom";

import { useState, type ReactNode } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBanknotes,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineTag,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { LogoutBtn } from "../auth/LogoutButton";
import { MapPin, Settings, Users } from "lucide-react";

type AdminLink = {
  href: string;
  icon: ReactNode;
  label: string;
  end?: boolean;
};

export const adminQuickLinks: AdminLink[] = [
  {
    href: `/admin/listings`,
    icon: <FaMotorcycle className="w-5 h-5" />,
    label: "Listings",
  },
  {
    href: `/admin/inspections`,
    icon: <HiOutlineClipboardDocumentCheck className="w-5 h-5" />,
    label: "Inspections",
  },
  {
    href: `/admin/payments`,
    icon: <HiOutlineBanknotes className="w-5 h-5" />,
    label: "Payments",
  },
];

const adminLinks: AdminLink[] = [
  {
    href: "/admin",
    icon: <HiOutlineSquares2X2 className="w-5 h-5" />,
    label: "Overview",
    end: true,
  },

  ...adminQuickLinks,
  { href: `/admin/users`, icon: <Users className="w-5 h-5" />, label: "Users" },
  {
    href: "/admin/brands",
    icon: <HiOutlineTag className="w-5 h-5" />,
    label: "Brands",
  },
  {
    href: "/admin/locations",
    icon: <MapPin className="w-5 h-5" />,
    label: "Locations",
  },
  {
    label: "Settings",
    href: `/admin/profile`,
    icon: <Settings className="w-4 h-4" />,
  },
];
const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="space-y-1">
      {adminLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end={link?.end}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand/20 "
                : "text-surface-400 hover:bg-surface-800 hover:text-surface-200"
            }`
          }
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
      <LogoutBtn className="mt-8" />
    </nav>
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* ============ DESKTOP SIDEBAR ============ */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface-900  ">
        <div className="p-6 pb-4">
          <Link to="/" className="font-display font-bold text-xl">
            Moto<span className="text-brand">Trust</span>
          </Link>
          <span className="block text-xs text-surface-400 font-normal mt-1">
            Admin Panel
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <NavLinks />
        </div>
        <div className="px-4 pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-surface-400 hover:text-surface-200 transition-colors"
          >
            <HiOutlineArrowRight className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* ============ MOBILE HEADER ============ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface-elevated _glasss text-brand h-14 flex items-center justify-between px-4">
        <Link to="/" className="font-display font-bold text-lg">
          Moto<span className="text-brand">Trust</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-surface-800 rounded-xl transition-colors"
        >
          {mobileMenuOpen ? (
            <HiOutlineXMark className="w-5 h-5" />
          ) : (
            <HiOutlineBars3 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ============ MOBILE SLIDE-OVER ============ */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="lg:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-surface-elevated shadow-2xl animate-in slide-in-from-left duration-200 ">
            <div className="p-4 overflow-y-auto h-full">
              <NavLinks onClick={closeMobileMenu} />
            </div>
          </div>
        </>
      )}

      {/* ============ MAIN CONTENT - ONLY THIS SCROLLS ============ */}
      <main className="flex-1 overflow-y-auto bg-surface">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8 pb-24 lg:pb-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
