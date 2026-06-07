import { Toaster } from "sonner";
import BackToTopButton from "@/components/scroll/ToTopBtn";

import { Swinger } from "@/components/Animate/Swing";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop";
import Footer from "./Footer";
import Navbar from "@/components/Navbar";
 

export default function MainLayout() {
  return (
    <main className="relative">
      <ScrollToTop />

      <Navbar />
      <div className={`min-h-screen overflow-x-hidden pb-6 `}>
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
