import { Link, useNavigate } from "react-router-dom";

import { HiOutlinePlusCircle, HiOutlineUser } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store";
import { logout } from "@/store/slices/auth.slice";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🏍️</span>
          <span className="font-display font-bold text-xl text-surface-900">
            Moto<span className="text-brand-500">Trust</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/create-listing")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 text-white rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
                >
                  <HiOutlinePlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Sell</span>
                </button>
              )}
              <Link
                to="/dashboard"
                className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
              >
                <HiOutlineUser className="w-5 h-5 text-surface-600" />
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5 text-surface-400" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-brand-500 text-white rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
