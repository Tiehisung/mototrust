// hooks/useScrollReveal.ts
import { useEffect, useRef, RefObject } from "react";

interface UseScrollRevealOptions {
  /** Selector for elements to reveal (default: '.reveal-on-scroll') */
  selector?: string;
  /** Threshold for intersection (0-1) (default: 0.15) */
  threshold?: number;
  /** Root margin for intersection observer (default: '0px') */
  rootMargin?: string;
  /** Once revealed, stop observing? (default: true) */
  once?: boolean;
  /** Custom class to add when revealed (default: 'in-view') */
  revealedClass?: string;
  /** Delay in ms before revealing (default: 0) */
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    selector = ".reveal-on-scroll",
    threshold = 0.15,
    rootMargin = "0px",
    once = true,
    revealedClass = "in-view",
    delay = 0,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add(revealedClass);
              }, delay);
            } else {
              entry.target.classList.add(revealedClass);
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove(revealedClass);
          }
        });
      },
      { threshold, rootMargin },
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, once, revealedClass, delay]);
};

// For single element ref
export const useElementScrollReveal = <T extends HTMLElement>(
  options: UseScrollRevealOptions = {},
): RefObject<T | null> => {
  const elementRef = useRef<T>(null);
  const {
    threshold = 0.15,
    rootMargin = "0px",
    once = true,
    revealedClass = "in-view",
    delay = 0,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                element.classList.add(revealedClass);
              }, delay);
            } else {
              element.classList.add(revealedClass);
            }
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.classList.remove(revealedClass);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, revealedClass, delay]);

  return elementRef;
};
