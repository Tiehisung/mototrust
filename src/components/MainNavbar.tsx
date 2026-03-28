// src/components/Navbar.tsx
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Drawer } from "@/components/headlessUI/Drawer";
import { Link, useLocation } from "react-router-dom";
import { AVATAR } from "@/components/ui/avatar";
import { logos } from "@/assets/images";
import { scrollToSection } from "@/lib/dom";
import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";
import UserLogButtons from "./UserLogger";
import { LogoutBtn } from "./auth/LogoutButton";

interface ILink {
  label: string;
  href?: string;
  id?: string;
}

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isLanding = pathname == "/";

  const mainpage = pathname.split("/")[1] || "Home";

  const navLinks: ILink[] = [
    { label: "Home", href: "/" },
    { label: "Squad", id: "squad", href: "/squad" },
    { label: "Players", id: "players", href: "/players" },
    { label: "Fixtures", id: "fixtures", href: "/matches" },
    { label: "Contact", href: "/contact" },
    { label: "About", id: "about" },
    { label: "News", href: "/news" },
  ];

  return (
    <>
      <nav className=" bg-primary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start items-center h-16 text-white">
            {/* Left Section - Menu Button (Mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-Red transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className=" pl-6 mr-auto uppercase text-sm font-semibold">
              {mainpage}
            </div>

            {/* Left Section - Desktop Spacer */}
            <div className="hidden lg:block w-10" />

            {/* Logo - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <AVATAR
                src={logos.logoTrans}
                size={"md"}
                className="scale-110 bg-white/90 backdrop-blur-3xl drop-shadow-accent drop-shadow-md"
              />
            </div>

            {/* Right Section - User & Search */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-Red transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <UserLogButtons />
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (Optional) */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8 h-12">
              {navLinks.map((link) => {
                if (link.id && isLanding)
                  return (
                    <div
                      key={link.label}
                      onClick={() => scrollToSection(link.id)}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-Red hover:border-b-2 hover:border-Red transition-colors cursor-pointer "
                    >
                      {link.label}
                    </div>
                  );
                if (link.href)
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-Red hover:border-b-2 hover:border-Red transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        position="top"
        size="sm"
        title="Menu"
        className=" max-h-[75vh]"
      >
        <nav className="flex flex-col p-4 gap-2 ">
          {navLinks.map((item) => {
            if (item?.id && isLanding)
              return (
                <Button
                  variant={"ghost"}
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item?.id as string);
                    fireEscape();
                  }}
                  className="h-16 px-6 bg-white text-primary transition-colors font-medium justify-start py-3"
                >
                  {item.label}
                </Button>
              );
            if (item?.href)
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-6 py-5 text-base font-medium bg-white text-primary hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              );
          })}

          <LogoutBtn text="Logout" className="grow" />
        </nav>
      </Drawer>

      {/* Search Drawer */}
      <Drawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        position="right"
        size="md"
        title="Search"
      >
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, articles, and more..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Recent Searches (Optional) */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">
              Recent Searches
            </h3>
            <div className="mt-2 space-y-2">
              {["laptop", "headphones", "keyboard"].map((search) => (
                <button
                  key={search}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
