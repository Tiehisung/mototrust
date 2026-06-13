// hooks/useScrollToTop.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

export const useScrollProgressBar = (elementId?: string) => {
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById(elementId || "scroll-progress");
      if (bar) {
        bar.style.transform = `scaleX(${scrolled / 100})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementId]);
};