import Loader from "./loaders/Loader";

import { Link } from "react-router-dom";
import { useAuth } from "@/store/hooks/useAuth";
import LoginController from "./auth/LoginModal";
 
import { UserCircle } from "lucide-react";
import { getInitials } from "@/lib";

export default function UserLogButtons() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader message="" />;

  if (user) {
    const path =
      user?.role == "player"
        ? `/players/dashboard`
        : user?.role?.includes("admin")
          ? "/admin"
          : "";

    if (user.role == "fan")
      return (
        <div className="flex items-center gap-2.5 text-sm">
          <p>Fan</p>
       
        </div>
      );

    return (
      <div className="flex items-center gap-6 md:gap-2">
        <Link
          to={path}
          className="border _borderColor hover:ring rounded px-2 py-1 h-full"
          title='Go to dashboard'
        >
          {getInitials(user?.name) ?? "Dashboard"}
        </Link>

     
      </div>
    );
  }
  return (
    <LoginController trigger={<UserCircle className="min-h-5 min-w-5 " />} />
  );
}
