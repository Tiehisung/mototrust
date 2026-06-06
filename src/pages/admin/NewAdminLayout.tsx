import { Outlet, NavLink, useNavigate } from "react-router-dom";
 
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBanknotes,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { useAppDispatch } from "@/store/hooks/store";
import { logout } from "@/store/slices/auth.slice";

const adminLinks = [
  { to: "/admin", icon: HiOutlineSquares2X2, label: "Overview", end: true },
  { to: "/admin/listings", icon: FaMotorcycle, label: "Listings" },
  { to: "/admin/users", icon: HiOutlineUsers, label: "Users" },
  {
    to: "/admin/inspections",
    icon: HiOutlineClipboardDocumentCheck,
    label: "Inspections",
  },
  { to: "/admin/payments", icon: HiOutlineBanknotes, label: "Payments" },
];

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-900 text-white p-6 hidden lg:block">
        <div className="font-display font-bold text-xl mb-8">
          Moto<span className="text-brand-400">Trust</span>
          <span className="block text-xs text-surface-400 font-normal mt-1">
            Admin Panel
          </span>
        </div>
        <nav className="space-y-1">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/20 text-brand-400"
                    : "text-surface-400 hover:bg-surface-800 hover:text-surface-200"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-500 hover:text-rose-400 hover:bg-surface-800 transition-colors mt-8 w-full"
        >
          <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
