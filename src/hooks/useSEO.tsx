//hooks/useSeo.ts
import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export function useSeo({ title, description, ogImage }: SeoProps) {
  useEffect(() => {
    if (title) document.title = title;


console.log("Setting SEO:", { title, description, ogImage });
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) setMeta("og:description", description);
    if (ogImage) setMeta("og:image", ogImage);
    if (title) setMeta("og:title", title);
  }, [title, description, ogImage]);
}
