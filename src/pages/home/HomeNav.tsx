import { UserMenu } from "@/components/auth/UserMenu";
import { useAppSelector } from "@/store/hooks/store";
import { FaMotorcycle } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const { user } = useAppSelector((s) => s.auth);
  return (
    <header className="fixed top-6 left-0 right-0 z-100 flex justify-center px-4 md:px-6 w-full pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl border border-border bg-card/80 backdrop-blur-2xl rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex w-full px-6 md:px-12 py-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <FaMotorcycle className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-foreground">
              Moto<span className="text-primary">Mart</span>
              <span className="text-xs text-muted-foreground font-normal ml-1">
                GH
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Browse", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              hidden={!!user}
              to="/auth/signin"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              to={
                user?.role === "seller"
                  ? "/dashboard/listings/create"
                  : "/auth/register?role=seller"
              }
              className="max-sm:hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] dark:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              Start Selling
              <HiOutlineArrowRight className="w-3.5 h-3.5" />
            </Link>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeNav;
