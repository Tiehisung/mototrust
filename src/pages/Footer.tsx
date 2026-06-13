import ThemeSwitch from "@/components/ThemeSwitch";
import { useAppSelector } from "@/store/hooks/store";
import { FaMotorcycle } from "react-icons/fa";
import { HiOutlineMapPin, HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useAppSelector((s) => s.auth);
  const links = [
    { to: "/browse", label: "Browse Bikes" },
    {
      to:
        user?.role == "seller"
          ? "/dashboard/listings/create"
          : "/auth/register?role=seller",
      label: "Start Selling",
    },
  ].concat(user ? [] : [{ to: "/auth/signin", label: "Sign In" }]);
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10 px-6 md:px-12 lg:px-24 relative z-20">
      <div className="max-w-350 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <FaMotorcycle className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl text-foreground">
                Moto<span className="text-primary">Mart</span>
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  GH
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground font-light text-sm max-w-sm mb-8 leading-relaxed">
              Ghana's trusted motorbike marketplace. Buy and sell with
              confidence across Upper West and beyond.
            </p>

            <ThemeSwitch/>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-light">
                <HiOutlineMapPin className="w-4 h-4 text-primary" />
                Wa, Upper West Region
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-light">
                <HiOutlineEnvelope className="w-4 h-4 text-primary" />
                hello@motomartgh.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} MotoMartGH. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground text-xs font-medium uppercase tracking-widest transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground text-xs font-medium uppercase tracking-widest transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
