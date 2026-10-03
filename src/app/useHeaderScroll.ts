import { useEffect } from "react";

/** body.scrolled once the page moved; body.hdr-hidden while scrolling down (layout.css hides the header on phones) */
export const useHeaderScroll = () => {
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY,
        b = document.body.classList;
      b.toggle("scrolled", y > 4);
      if (y < 64) {
        b.remove("hdr-hidden");
        last = y;
      } else if (y > last + 8) {
        b.add("hdr-hidden");
        last = y;
      } else if (y < last - 8) {
        b.remove("hdr-hidden");
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};
