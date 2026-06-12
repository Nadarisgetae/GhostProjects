"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <Link href="/" className="nav-logo" onClick={handleLogoClick}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="16" cy="16" rx="14" ry="9" stroke="#F0EDE8" strokeWidth="1.2" />
          <ellipse cx="16" cy="16" rx="5" ry="5" fill="#F0EDE8" />
          <line x1="2" y1="16" x2="6" y2="10" stroke="#F0EDE8" strokeWidth="1" />
          <line x1="30" y1="16" x2="26" y2="10" stroke="#F0EDE8" strokeWidth="1" />
        </svg>
        <span>GHOST<br />PROJECTS</span>
      </Link>
      <div className="nav-links">
        {isHome ? (
          <a href="#projects" onClick={handleProjectsClick}>PROJECTS</a>
        ) : (
          <Link href="/#projects">PROJECTS</Link>
        )}
        <Link href="/about">ABOUT</Link>
        <div className="nav-dot"></div>
      </div>
    </nav>
  );
}
