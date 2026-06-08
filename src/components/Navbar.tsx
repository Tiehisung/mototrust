import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks/store";
import { UserMenu } from "./auth/UserMenu";
import { symbols } from "@/data";

const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 _glass">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl pb-3">{symbols.motor}</span>
          <span className="font-display font-bold text-xl text-brand">
            Moto<span className="text-brand-500">Trust</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/create-listing")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 text-primary rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
                >
                  <HiOutlinePlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Sell</span>
                </button>
              )}
            </>
          ) : (
            <>
              <Link
                to="/auth/register"
                className="px-4 py-2 bg-brand-500 text-brand rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
