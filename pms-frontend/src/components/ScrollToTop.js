import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top-left
    window.scrollTo(0, 0);

    // Optional: If you want smooth scrolling, use this instead:
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]); // Triggers whenever the URL path changes

  return null;
}
