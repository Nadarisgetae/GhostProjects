"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Refs for custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Refs for scroll-synced spider thread
  const threadContainerRef = useRef<HTMLDivElement>(null);
  const spiderWrapRef = useRef<HTMLDivElement>(null);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // ── CURSOR FOLLOW ANIMATION ──
    const isMobile = window.innerWidth <= 768;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
    }

    let cursorAnimId: number;
    const animCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }
      if (ringRef.current) {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      cursorAnimId = requestAnimationFrame(animCursor);
    };

    if (!isMobile) {
      animCursor();
    }

    // ── SPIDER IDLE HANGING ANIMATION ──
    let simulationId: number;

    const runSimulation = () => {
      const scrollY = window.scrollY;
      const clientHeight = window.innerHeight;

      // Calculate opacity fade out as we scroll past the landing page
      // Starts fading when scroll reaches 20% of viewport, fully disappears by 60% of viewport
      let threadOpacity = 1;
      const fadeStart = clientHeight * 0.2;
      const fadeEnd = clientHeight * 0.6;
      if (scrollY > fadeStart) {
        threadOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      if (threadContainerRef.current) {
        threadContainerRef.current.style.opacity = `${threadOpacity}`;
        threadContainerRef.current.style.visibility = threadOpacity <= 0 ? "hidden" : "visible";
      }

      if (spiderWrapRef.current) {
        const time = Date.now();
        // Slow, natural idle sway (rotation)
        const idleSway = Math.sin(time * 0.0012) * 2.5;
        // Slow, natural vertical float (bobbing)
        const idleFloat = Math.cos(time * 0.0018) * 5;

        // Apply physical-like idle transform (vertical bobbing and sway rotation)
        spiderWrapRef.current.style.transform = `translateY(${idleFloat}px) rotate(${idleSway}deg)`;
      }

      simulationId = requestAnimationFrame(runSimulation);
    };

    simulationId = requestAnimationFrame(runSimulation);

    // ── SCROLL REVEALS ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach((el) => revealObserver.observe(el));

    // ── ACTIVE DOT MONITORING ──
    const sections = ["hero", "projects", "future"];
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) dotObserver.observe(el);
    });

    // Clean up
    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(cursorAnimId);
      }
      cancelAnimationFrame(simulationId);
      revealObserver.disconnect();
      dotObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Custom Cursor elements (hidden on mobile via CSS) */}
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>




      {/* SCROLL DOTS */}
      <div className="scroll-dots">
        <div
          className={`scroll-dot ${activeSection === "hero" ? "active" : ""}`}
          onClick={() => scrollToSection("hero")}
        ></div>
        <div
          className={`scroll-dot ${activeSection === "projects" ? "active" : ""}`}
          onClick={() => scrollToSection("projects")}
        ></div>
        <div
          className={`scroll-dot ${activeSection === "future" ? "active" : ""}`}
          onClick={() => scrollToSection("future")}
        ></div>
      </div>

      {/* SPIDER */}
      <div id="thread-container" ref={threadContainerRef}>
        <div id="spider-wrap" ref={spiderWrapRef}>
          <Image
            src="/spider.png"
            id="spider-img"
            alt="spider hanging on web"
            width={120}
            height={320}
            priority
          />
        </div>
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <span className="hero-eyebrow reveal" style={{ transitionDelay: "0s" }}>
            PRIVACY INFRASTRUCTURE
          </span>
          <h1 className="reveal" style={{ transitionDelay: "0.15s" }}>
            GHOST<br />PROJECTS<span>.</span>
          </h1>
          <p className="hero-sub reveal" style={{ transitionDelay: "0.3s" }}>
            We build tools that break barriers<br />and put privacy back in your hands.
          </p>
          <button
            className="scroll-cta reveal"
            style={{ transitionDelay: "0.45s" }}
            onClick={() => scrollToSection("projects")}
          >
            <span className="scroll-arrow"></span>
            SCROLL TO EXPLORE
          </button>
        </div>
        <div className="hero-video-wrap reveal" style={{ transitionDelay: "0.3s" }}>
          <video
            src="/main.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          />
        </div>
      </section>

      {/* PROJECTS */}
      <div className="divider"></div>
      <section className="product-section" id="projects">
        <div className="product-inner">
          <div className="reveal-left">
            <p className="product-label">
              <span></span>01 — GHOST BROWSER
            </p>
            <h2>GHOST<br />BROWSER</h2>
            <p className="product-tagline">THE INTERNET WITHOUT WALLS</p>
            <p className="product-desc">
              Ghost Browser automatically bypasses censorship, firewalls, and network restrictions. No VPN. No proxies. Just freedom.
            </p>
            <div className="btn-group">
              <Link href="/ghost-browser#download" className="btn-primary">DOWNLOAD NOW &nbsp;↗</Link>
              <Link href="/ghost-browser" className="btn-secondary">LEARN MORE &nbsp;→</Link>
            </div>
          </div>
          <div className="reveal-right">
            <div className="browser-mockup">
              <div className="browser-bar">
                <div className="browser-dots">
                  <span className="bd-r"></span>
                  <span className="bd-y"></span>
                  <span className="bd-g"></span>
                </div>
                <div className="browser-url">ghost://browser</div>
              </div>
              <div className="browser-body">
                <div className="browser-icon">
                  <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
                    <ellipse cx="26" cy="16" rx="23" ry="14" stroke="#555" strokeWidth="1.5" />
                    <ellipse cx="26" cy="16" rx="8" ry="8" fill="#333" />
                    <line x1="3" y1="16" x2="9" y2="8" stroke="#555" strokeWidth="1.2" />
                    <line x1="49" y1="16" x2="43" y2="8" stroke="#555" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="browser-search">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#555" strokeWidth="1.2" />
                    <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="#555" strokeWidth="1.2" />
                  </svg>
                  Search the web freely...
                  <div className="browser-search-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <div className="divider"></div>
      <section className="future-section" id="future">
        <div className="future-inner">
          <div className="future-text reveal-left">
            <h2>MORE<br />TO COME</h2>
            <p>
              We&apos;re building more tools to protect your privacy, secure your data, and free the internet. Stay tuned.
            </p>
          </div>
          <div className="future-spider future-spider-crawl reveal">
            <Image
              src="/spider.png"
              alt="glowing spider"
              width={160}
              height={426}
            />
          </div>
          <div className="future-tagline reveal-right">
            <div className="lock-icon" role="img" aria-label="lock">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <p>
              <strong>THE FUTURE IS PRIVATE.</strong><br />THE FUTURE IS YOURS.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}>
          <svg width="24" height="16" viewBox="0 0 32 22" fill="none">
            <ellipse cx="16" cy="11" rx="14" ry="9" stroke="#555" strokeWidth="1.2" />
            <ellipse cx="16" cy="11" rx="4" ry="4" fill="#555" />
          </svg>
          GHOST PROJECTS
        </a>
        <div className="footer-links">
          <Link href="/about">ABOUT</Link>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
        </div>
      </footer>
    </>
  );
}
