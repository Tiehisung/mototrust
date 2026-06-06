import { Navigate, useLocation } from "react-router-dom";
import { EUserRole } from "@/types/user";
import { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks/store";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: EUserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Logged in but wrong role
  if (user && !allowedRoles.includes(user.role as EUserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
