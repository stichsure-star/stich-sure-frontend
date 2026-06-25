import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll the window back to the very top coordinates
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any UI elements
};

export default ScrollToTop;
