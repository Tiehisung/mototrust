import { useAppDispatch, useAppSelector } from "@/store/hooks/store";
import { logout } from "@/store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PiSignOut } from "react-icons/pi";

interface IProps {
  className?: string;
  text?: string;
  redirectTo?: string;
  stayOnPage?: boolean;
  onClick?: () => void;
}

export const LogoutBtn = ({
  className = "",
  text = "Sign Out",
  onClick,
}: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <button
      onClick={() => {
        handleLogout();
        onClick?.();
      }}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-400 hover:text-red-500 hover:bg-red-50 transition-colors w-full",
        className,
      )}
    >
      <PiSignOut className="w-5 h-5" />
      {text}
    </button>
  );
};
