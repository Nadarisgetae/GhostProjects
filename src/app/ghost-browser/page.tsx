"use client";

import { useState, useEffect, useRef } from "react";


export default function GhostBrowserPage() {
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [downloadState, setDownloadState] = useState<"locked" | "decrypting" | "unlocked">("locked");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Custom cursor refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom cursor movement
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

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(cursorAnimId);
      }
    };
  }, []);

  // Log auto-scroll
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [consoleLogs]);

  const startDecryption = () => {
    if (downloadState !== "locked") return;
    setDownloadState("decrypting");

    const logs = [
      "🛡️ INITIALIZING SECURE BYPASS TUNNEL...",
      "🔍 PROBING NETWORK FIREWALL (SIGNATURE DETECTED)...",
      "✂️ INITIATING SPLITCAST TCP SEGMENTATION PROTOCOL...",
      "⚡ INJECTING 50ms TLS HANDSHAKE BYTE DELAYS...",
      "🌐 RESOLVING COMPATIBLE DNS ENVELOPE VIA DOH CONSENSUS...",
      "🔐 BYPASS VERIFIED. CARRIER FALLBACK STABLE.",
      "🗝️ DECRYPTING DOWNLOAD LINK SIGNATURE...",
      "🔒 STATUS: UNLOCKED. DISPATCHING BINARY PIPELINE."
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setDownloadState("unlocked");
      }
    }, 450);
  };

  const handleDownloadClick = () => {
    setShowComingSoon(true);
  };

  return (
    <div className="browser-page-bg">
      {/* Cursor elements */}
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>




      <main className="browser-content-container">
        {/* HERO TITLE */}
        <section className="browser-hero">
          <span className="eyebrow">PRODUCT PROFILE</span>
          <h1>GHOST BROWSER</h1>
          <p className="subtitle">THE INTERNET WITHOUT WALLS</p>
          <div className="underline-decor"></div>
        </section>

        {/* INTERACTIVE LOCKED DOWNLOAD TERMINAL */}
        <section className="terminal-section" id="download">
          <div className="terminal-window">
            <div className="terminal-bar">
              <div className="term-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="term-title">ghost-downloader.sh</div>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
              <div className="term-line">
                <span className="prompt">$</span> ghost-browser --status
              </div>
              <div className="term-line output">
                ENVIRONMENT: SCHOOL / RESTRICTED LOCAL LAN
              </div>
              <div className="term-line output error">
                ACCESS PROTOCOL: [LOCKED] ENCRYPTED PACKAGE DETECTED
              </div>

              {consoleLogs.map((log, i) => (
                <div key={i} className="term-line output success">
                  {log}
                </div>
              ))}

            </div>
            <div className="terminal-footer">
              {downloadState === "locked" && (
                <button className="term-btn lock-btn" onClick={startDecryption}>
                  🔒 DECRYPT SECURE PROTOCOL
                </button>
              )}
              {downloadState === "decrypting" && (
                <button className="term-btn loading-btn" disabled>
                  ⏳ CORRELATING TLS FRAGMENTS...
                </button>
              )}
              {downloadState === "unlocked" && (
                <div className="download-options-group">
                  <button className="term-btn unlock-btn pulse" onClick={handleDownloadClick}>
                    🍎 MAC DOWNLOAD
                  </button>
                  <button className="term-btn unlock-btn pulse" onClick={handleDownloadClick}>
                    ❖ WINDOWS DOWNLOAD
                  </button>
                  <button className="term-btn unlock-btn pulse" onClick={handleDownloadClick}>
                    🐧 LINUX DOWNLOAD
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* OVERVIEW CONTENT */}
        <section className="detail-section">
          <div className="card text-card">
            <h2>🌐 What Is Ghost Browser?</h2>
            <p>
              Ghost Browser is a desktop web browser built from the ground up to give you <strong>unrestricted, private, and secure access</strong> to the entire internet — no matter what network you're on. Whether you're at school, work, a hotel, or in a country with strict internet censorship, Ghost Browser is designed to get you through.
            </p>
            <p className="highlight-p">
              It's not a VPN. It's not Tor. It's something entirely new.
            </p>
          </div>
        </section>

        {/* WHAT MAKES UNIQUE */}
        <section className="detail-section">
          <div className="card dark-card">
            <h2>🛡️ What Makes Ghost Browser Unique?</h2>
            <p className="margin-bottom-md">
              Most "privacy browsers" focus on blocking ads or hiding cookies. Ghost Browser goes far beyond that. Here's what sets it apart from every other browser on the market:
            </p>
            <div className="features-grid">
              <div className="feature-subcard">
                <h3>1. Automatic Bypass</h3>
                <p>Detects school/corporate firewalls (Sophos, Fortinet, Zscaler) and government filters. Activates a custom evasion engine in milliseconds.</p>
              </div>
              <div className="feature-subcard">
                <h3>2. No VPN Lag</h3>
                <p>Connects directly to target websites using ECH and QUIC. Bypasses firewalls without routing traffic through third-party servers.</p>
              </div>
              <div className="feature-subcard">
                <h3>3. Zero Config</h3>
                <p>No extensions to install, no servers to subscribe to, no account creation. Fully functional the moment it's launched.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section className="detail-section">
          <h2>📊 Feature Comparison Matrix</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Chrome</th>
                  <th>Brave</th>
                  <th>Tor Browser</th>
                  <th>Ghost Browser</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ad & Tracker Blocking</td>
                  <td className="no">❌ Extension</td>
                  <td className="yes">✅ Built-in</td>
                  <td className="yes">✅ Built-in</td>
                  <td className="yes">✅ Built-in</td>
                </tr>
                <tr>
                  <td>Fingerprint Shield</td>
                  <td className="no">❌ None</td>
                  <td className="warn">⚠️ Partial</td>
                  <td className="yes">✅ Built-in</td>
                  <td className="yes">✅ 10-Point Protection</td>
                </tr>
                <tr>
                  <td>Censorship Bypass</td>
                  <td className="no">❌ None</td>
                  <td className="no">❌ None</td>
                  <td className="warn">⚠️ Slow Tor</td>
                  <td className="yes">✅ Instant Direct</td>
                </tr>

              </tbody>
            </table>
          </div>
        </section>

        {/* PRIVACY SHIELD DETAILS */}
        <section className="detail-section">
          <div className="card">
            <h2>🕵️ Fingerprint Shield Protection</h2>
            <div className="list-styled">
              <div><strong>Canvas Spoofing:</strong> Adds noise to canvas image rendering outputs.</div>
              <div><strong>WebGL Spoofing:</strong> Cycles GPU profiles to make your hardware identity anonymous.</div>
              <div><strong>Audio Spoofing:</strong> Masks AudioContext sound signatures from trackers.</div>
              <div><strong>User-Agent Rotation:</strong> Cycles matching browser agent headers per session.</div>
              <div><strong>WebRTC Shield:</strong> Hides your actual internal and external IP addresses.</div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bottom-cta">
          <h2>Get Started Today</h2>
          <p>Download Ghost Browser to bypass local blockades and secure your footprint instantly.</p>
          <a href="#download" className="term-btn unlock-btn pulse" style={{ display: "inline-block", marginTop: "20px" }}>
            📥 GO TO DOWNLOAD TERMINAL
          </a>
        </section>
      </main>

      <footer className="browser-footer-links">
        <div>© {new Date().getFullYear()} GHOST NETWORKS. SECURE · PRIVATE · FAST.</div>
      </footer>

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <div className="coming-soon-overlay" onClick={() => setShowComingSoon(false)}>
          <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
            <div className="coming-soon-icon">🚀</div>
            <h3>COMING SOON</h3>
            <p>Ghost Browser is currently under development.<br />Stay tuned for the official release.</p>
            <button className="term-btn lock-btn" onClick={() => setShowComingSoon(false)}>
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
