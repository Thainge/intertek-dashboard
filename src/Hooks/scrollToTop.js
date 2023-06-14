import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on route change
export default function ScrollToTop({ component }) {
    const { pathname } = useLocation();

    useEffect(() => {
        component.current.scrollTop = 0;
    }, [pathname]);

    return null;
}