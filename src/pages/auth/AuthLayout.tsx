import HEADER from "@/components/Element";
import { AVATAR } from "@/components/ui/avatar";
import { ENV } from "@/lib/env";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <HEADER
        title={
          <Link to="/" className="text-primary hover:underline flex items-center gap-2 mx-auto w-fit">
            <AVATAR
              src={ENV.LOGO_NO_BG_URL}
              size={"md"}
              className="scale-110 bg-accent/90 backdrop-blur-3xl drop-shadow-accent drop-shadow-md"
              />
              <span>{ENV.APP_NAME}</span>
          </Link>
        }
      />
      <Outlet />
    </div>
  );
}
