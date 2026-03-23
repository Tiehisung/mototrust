// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm text-white">B</span>
              </div>
              <span className="font-bold text-white">
                Bunyeni<span className="text-emerald-500">FC</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Building champions, uniting communities since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  About Club
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Tickets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Academy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Membership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Official Partners</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500">Nike</li>
              <li className="text-gray-500">Heineken</li>
              <li className="text-gray-500">Local Bank</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>
            © 2025 Bunyeni Football Club. All rights reserved. Built with
            passion for the beautiful game.
          </p>
          <p className="mt-2">
            <a href="#" className="hover:text-emerald-500 transition">
              Privacy Policy
            </a>{" "}
            •
            <a href="#" className="hover:text-emerald-500 transition ml-2">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
