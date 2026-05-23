"use client";

import { useEffect, useRef, useState } from "react";

export function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = ["nav", hidden ? "nav--hidden" : "", atTop ? "nav--top" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={cls}>
      <div className="nav__inner">
        <span className="nav__logo">PraxisOT</span>
        <div className="nav__links">
          <a href="#demo">Platform</a>
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Privacy</a>
          <a href="#waitlist">Early Access</a>
        </div>
        <a href="#waitlist" className="nav__cta">Get early access →</a>
      </div>
    </nav>
  );
}
