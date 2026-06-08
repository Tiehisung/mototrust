
import { Link } from "react-router-dom";

import { UserCircle } from "lucide-react";
import { getInitials } from "@/lib";
import { SignInController } from "@/pages/auth/signin/Page";
import { useAppSelector } from "@/store/hooks/store";

export default function UserLogButtons() {
  const { user,   } = useAppSelector((s) => s.auth);

  if (!user) return;

  if (user) {
    const path = user?.role !== "admin" ? `/dashboard` : "/admin";

    return (
      <div className="flex items-center gap-6 md:gap-2">
        <Link
          to={path}
          className="border _borderColor hover:ring rounded px-2 py-1 h-full"
          title="Go to dashboard"
        >
          {getInitials(user?.fullName) ?? "Dashboard"}
        </Link>
      </div>
    );
  }
  return (
    <SignInController trigger={<UserCircle className="min-h-5 min-w-5 " />} />
  );
}
