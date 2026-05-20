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
        <span className="nav__logo">Cadence</span>
        <div className="nav__links">
          <a href="#platform">Platform</a>
          <a href="#evidence">Evidence</a>
          <a href="#security">Security</a>
          <a href="#waitlist">Pilot</a>
        </div>
        <a href="/app" className="nav__cta">Open app →</a>
      </div>
    </nav>
  );
}
