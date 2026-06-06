import { Outlet, NavLink, useNavigate } from "react-router-dom";
 
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineClipboardDocumentCheck,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { useAppDispatch } from "@/store/hooks/store";
import { logout } from "@/store/slices/auth.slice";

const sidebarLinks = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Overview", end: true },
  {
    to: "/dashboard/listings",
    icon: FaMotorcycle,
    label: "My Listings",
  },
  { to: "/dashboard/payments", icon: HiOutlineCreditCard, label: "Payments" },
  {
    to: "/dashboard/inspections",
    icon: HiOutlineClipboardDocumentCheck,
    label: "Inspections",
  },
  { to: "/dashboard/profile", icon: HiOutlineUser, label: "Profile" },
  {
    to: "/dashboard/verify-identity",
    icon: HiOutlineShieldCheck,
    label: "Verify Identity",
  },
];

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 p-6 hidden lg:block">
        <div className="font-display font-bold text-xl text-surface-900 mb-8">
          Moto<span className="text-brand-500">Trust</span>
        </div>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-surface-500 hover:bg-surface-50 hover:text-surface-700"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-400 hover:text-rose-500 hover:bg-rose-50 transition-colors mt-8 w-full"
        >
          <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
