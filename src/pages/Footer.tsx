// components/Footer.tsx
import { ThemeModeToggle } from "@/components/ThemeToggle";
import { AVATAR } from "@/components/ui/avatar";
import { TEAM } from "@/data/team";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AVATAR src={TEAM.logo} size={"sm"} />
              <span className="font-bold text-white">
                Bunyeni <span className="text-primary">FC</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Building champions, uniting communities since 2024.
            </p>

            <ThemeModeToggle />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Club
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary transition">
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/highlights"
                  className="hover:text-primary transition"
                >
                  Highlights
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition">
                  Fans
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Official Partners</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500">Zenis Water, Konjiehi</li>
              <li className="text-gray-500">Miami Camp, Konjiehi</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>
            © 2025 Bunyeni Football Club. All rights reserved. Built with
            passion for the beautiful game.
          </p>
          <p className="mt-2">
            <Link to="#" className="hover:text-primary transition">
              Privacy Policy
            </Link>{" "}
            •
            <Link to="#" className="hover:text-primary transition ml-2">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
