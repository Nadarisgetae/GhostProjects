"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutPage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    let mx = 0, my = 0, rx = 0, ry = 0;

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

    if (!isMobile) animCursor();

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(cursorAnimId);
      }
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="about-page">
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>




      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-label reveal" style={{ transitionDelay: "0s" }}>
            ABOUT GHOST PROJECTS
          </span>
          <h1 className="reveal" style={{ transitionDelay: "0.15s" }}>
            WHY WE<br />EXIST<span>.</span>
          </h1>
          <div className="about-hero-line reveal" style={{ transitionDelay: "0.3s" }}></div>
          <p className="about-hero-statement reveal" style={{ transitionDelay: "0.4s" }}>
            The internet was created to connect people freely.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 2: THE PROBLEM ═══ */}
      <div className="about-divider"></div>
      <section className="about-section">
        <div className="about-narrow reveal">
          <p className="about-body-text">
            But over time, it became filled with tracking, surveillance, restrictions, distractions, and systems designed to control users instead of empowering them.
          </p>
          <p className="about-body-accent">
            Ghost Projects was created to build something different.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: BELIEFS ═══ */}
      <section className="about-section about-beliefs-section">
        <div className="about-narrow">
          <span className="about-label reveal">WHAT WE BELIEVE</span>
          <h2 className="reveal">Software should feel</h2>
          <div className="about-beliefs-grid">
            <div className="about-belief-item reveal" style={{ transitionDelay: "0s" }}>
              <div className="belief-marker"></div>
              <span>Private</span>
            </div>
            <div className="about-belief-item reveal" style={{ transitionDelay: "0.08s" }}>
              <div className="belief-marker"></div>
              <span>Lightweight</span>
            </div>
            <div className="about-belief-item reveal" style={{ transitionDelay: "0.16s" }}>
              <div className="belief-marker"></div>
              <span>Fast</span>
            </div>
            <div className="about-belief-item reveal" style={{ transitionDelay: "0.24s" }}>
              <div className="belief-marker"></div>
              <span>Intentional</span>
            </div>
            <div className="about-belief-item reveal" style={{ transitionDelay: "0.32s" }}>
              <div className="belief-marker"></div>
              <span>Independent</span>
            </div>
          </div>
          <div className="about-not-list reveal">
            <span>Not bloated.</span>
            <span>Not invasive.</span>
            <span>Not built to manipulate attention.</span>
          </div>
          <p className="about-body-text reveal" style={{ marginTop: "48px" }}>
            We build tools for people who want more control over their digital world.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 4: OUR VISION ═══ */}
      <div className="about-divider"></div>
      <section className="about-section about-vision-section">
        <div className="about-wide">
          <div className="about-vision-layout">
            <div className="about-vision-left reveal-left">
              <span className="about-label">OUR VISION</span>
              <h2>Build powerful<br />tools that respect<br />the user<span>.</span></h2>
            </div>
            <div className="about-vision-right reveal-right">
              <p className="about-body-text">
                Ghost Projects focuses on creating next-generation privacy-first technology and minimal digital experiences.
              </p>
              <div className="about-philosophy-list">
                <div className="philosophy-item">
                  <span className="philosophy-dash">—</span>
                  <span>Minimal design</span>
                </div>
                <div className="philosophy-item">
                  <span className="philosophy-dash">—</span>
                  <span>Clean experiences</span>
                </div>
                <div className="philosophy-item">
                  <span className="philosophy-dash">—</span>
                  <span>High performance</span>
                </div>
                <div className="philosophy-item">
                  <span className="philosophy-dash">—</span>
                  <span>Privacy by default</span>
                </div>
                <div className="philosophy-item">
                  <span className="philosophy-dash">—</span>
                  <span>Freedom without complexity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: FIRST PROJECT ═══ */}
      <div className="about-divider"></div>
      <section className="about-section about-project-section">
        <div className="about-narrow">
          <span className="about-label reveal">OUR FIRST PROJECT</span>
          <h2 className="about-project-title reveal">
            GHOST<br />BROWSER
          </h2>
          <p className="about-project-tagline reveal">The Internet Without Walls.</p>
          <p className="about-body-text reveal">
            Ghost Browser is the first system inside the Ghost ecosystem — a minimal browser focused on unrestricted access, speed, privacy, and simplicity.
          </p>
          <div className="about-stripped-list reveal">
            <span>No unnecessary features.</span>
            <span>No tracking.</span>
            <span>No noise.</span>
          </div>
          <p className="about-body-accent reveal" style={{ marginTop: "32px" }}>Just the web.</p>
          <div className="reveal" style={{ marginTop: "48px" }}>
            <Link href="/ghost-browser" className="btn-primary">
              EXPLORE GHOST BROWSER &nbsp;↗
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: MORE TO COME ═══ */}
      <div className="about-divider"></div>
      <section className="about-section about-future-section">
        <div className="about-wide">
          <div className="about-future-layout">
            <div className="about-future-text reveal-left">
              <span className="about-label">MORE TO COME</span>
              <h2>Ghost Browser is<br />only the beginning<span>.</span></h2>
              <p className="about-body-text">
                We are building future tools focused on privacy, security, communication, and digital freedom.
              </p>
            </div>
            <div className="about-future-grid reveal-right">
              <div className="future-project-card">
                <span className="future-project-icon">🤖</span>
                <span className="future-project-name">Ghost AI</span>
              </div>
              <div className="future-project-card">
                <span className="future-project-icon">☁️</span>
                <span className="future-project-name">Ghost Cloud</span>
              </div>
              <div className="future-project-card">
                <span className="future-project-icon">💾</span>
                <span className="future-project-name">Ghost Drive</span>
              </div>
              <div className="future-project-card">
                <span className="future-project-icon">🔍</span>
                <span className="future-project-name">Ghost Search</span>
              </div>
              <div className="future-project-card">
                <span className="future-project-icon">✉️</span>
                <span className="future-project-name">Ghost Mail</span>
              </div>
              <div className="future-project-card">
                <span className="future-project-icon">🖥️</span>
                <span className="future-project-name">Ghost OS</span>
              </div>
            </div>
          </div>
          <div className="about-built-slowly reveal">
            <span>Built slowly.</span>
            <span>Built carefully.</span>
            <span>Built differently.</span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: THE PEOPLE ═══ */}
      <div className="about-divider"></div>
      <section className="about-section about-team-section">
        <div className="about-wide">
          <div className="about-team-header reveal">
            <span className="about-label">THE PEOPLE BEHIND GHOST</span>
            <h2>Built In Silence<span>.</span></h2>
            <p className="about-body-text" style={{ maxWidth: "560px", margin: "0 auto" }}>
              Ghost Projects is being created by a small team focused on privacy, minimalism, and the future of independent technology.
            </p>
            <div className="about-not-list" style={{ marginTop: "32px", justifyContent: "center" }}>
              <span>Not built for trends.</span>
              <span>Not built for hype.</span>
            </div>
            <p className="about-body-accent" style={{ marginTop: "24px" }}>
              Built to create tools that feel powerful, intentional, and free.
            </p>
          </div>

          <div className="about-team-grid">
            {/* GHOST 01 */}
            <div className="team-card reveal-left">
              <div className="team-card-header">
                <span className="team-ghost-id">GHOST 01</span>
                <div className="team-accent-line"></div>
              </div>
              <h3 className="team-name">Ashish Goyal</h3>
              <p className="team-role">Cybersecurity · Core Systems · Network Architecture</p>
              <p className="team-desc">
                Focused on cybersecurity, infrastructure, secure systems, privacy architecture, and the deep technical foundation behind Ghost Projects.
              </p>
              <p className="team-desc">
                Works on building the invisible systems that power Ghost Browser and future Ghost technologies.
              </p>
              <blockquote className="team-quote">
                <p>&ldquo;Privacy is not optional.<br />Freedom should not require permission.&rdquo;</p>
              </blockquote>
            </div>

            {/* GHOST 02 */}
            <div className="team-card reveal-right">
              <div className="team-card-header">
                <span className="team-ghost-id">GHOST 02</span>
                <div className="team-accent-line"></div>
              </div>
              <h3 className="team-name">Daksh Mishra</h3>
              <p className="team-role">Product Vision · Design Systems · Project Architecture</p>
              <p className="team-desc">
                Focused on ecosystem planning, product direction, design systems, experience architecture, and building the long-term vision behind Ghost Projects.
              </p>
              <p className="team-desc">
                Works on transforming complex ideas into minimal and cinematic digital experiences.
              </p>
              <blockquote className="team-quote">
                <p>&ldquo;Good technology disappears.<br />Great technology empowers.&rdquo;</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: PHILOSOPHY ═══ */}
      <div className="about-divider"></div>
      <section className="about-section about-philosophy-section">
        <div className="about-narrow">
          <span className="about-label reveal">OUR PHILOSOPHY</span>
          <h2 className="reveal">We believe</h2>
          <div className="about-philosophy-beliefs">
            <div className="philosophy-belief-row reveal" style={{ transitionDelay: "0s" }}>
              <span className="philosophy-bullet"></span>
              <span>Privacy is a right</span>
            </div>
            <div className="philosophy-belief-row reveal" style={{ transitionDelay: "0.06s" }}>
              <span className="philosophy-bullet"></span>
              <span>Software should feel lightweight</span>
            </div>
            <div className="philosophy-belief-row reveal" style={{ transitionDelay: "0.12s" }}>
              <span className="philosophy-bullet"></span>
              <span>Users should stay in control</span>
            </div>
            <div className="philosophy-belief-row reveal" style={{ transitionDelay: "0.18s" }}>
              <span className="philosophy-bullet"></span>
              <span>Simplicity creates power</span>
            </div>
            <div className="philosophy-belief-row reveal" style={{ transitionDelay: "0.24s" }}>
              <span className="philosophy-bullet"></span>
              <span>Technology should empower people</span>
            </div>
          </div>
          <p className="about-body-text reveal" style={{ marginTop: "48px" }}>
            Ghost Projects is not trying to become louder than the internet.
          </p>
          <p className="about-body-accent reveal">
            We are trying to build tools that make the internet feel better again.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 9: CLOSING ═══ */}
      <section className="about-closing">
        <div className="about-closing-inner reveal">
          <h2>GHOST PROJECTS</h2>
          <div className="about-closing-words">
            <span>Privacy.</span>
            <span>Freedom.</span>
            <span>Power.</span>
          </div>
          <div className="about-closing-line"></div>
          <p className="about-closing-tag">Built differently.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <div>© {new Date().getFullYear()} GHOST PROJECTS. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}
