import { Toaster } from "sonner";
import BackToTopButton from "@/components/scroll/ToTopBtn";

import { Swinger } from "@/components/Animate/Swing";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop";
import Footer from "./Footer";
import Navbar from "@/pages/Navbar";

export default function MainLayout() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/welcome"))
    return (
      <div className="">
        <Outlet />
      </div>
    );
  return (
    <main className="relative">
      <ScrollToTop />

      <Navbar />
      <div className={`min-h-screen overflow-x-hidden pb-6 pt-16 lg:pt-20`}>
        <div className="_page">
          <Outlet />
        </div>
        <Swinger className="fixed bottom-6 right-6 z-30">
          <BackToTopButton />
        </Swinger>
        <Toaster position="top-right" richColors />
      </div>
      <Footer />
    </main>
  );
}
