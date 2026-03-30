import { Link } from "react-router-dom";
import { MegaSponsors } from "@/pages/sponsorship/MegaSponsors";
import { useLocation } from "react-router-dom";
import { ENV } from "@/lib/env";

export default function FooterCP() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <main hidden={pathname.includes("/admin")} className={`bg-Orange mt-5`}>
      <MegaSponsors />

      <br />
      <div className="flex gap-2 items-center p-6 mx-auto justify-center">
        <Link to="/" className="mr-3">
          <img src={ENV.LOGO_URL} width={40} height={40} alt="logo" />
        </Link>

        <cite>&copy; {new Date().getFullYear()}</cite>
      </div>
    </main>
  );
}
