import { symbols } from "@/data";
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-3xl pb-2.5">{symbols.motor}</span>
            <span className="font-display font-bold text-2xl text-surface-900">
              Moto<span className="text-brand-500">Trust</span>
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-soft p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
