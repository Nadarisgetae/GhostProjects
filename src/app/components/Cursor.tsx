"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorRendererProps {
  sensitivity: number;
  setSensitivity: (s: number) => void;
  showSettings: boolean;
  setShowSettings: (s: boolean) => void;
}

function CursorRenderer({
  sensitivity,
  setSensitivity,
  showSettings,
  setShowSettings,
}: CursorRendererProps) {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Map sensitivity 1-10 to stiffness & damping
  const stiffness = 200 + (sensitivity - 1) * 300;
  const damping = 30 + (sensitivity - 1) * 10;

  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [data-cursor], nav")) setHovering(true);
    };
    const onOut  = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [data-cursor], nav")) setHovering(false);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  useEffect(() => {
    if (!showSettings) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings, setShowSettings]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          userSelect: "none",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
        animate={{ scale: clicking ? 0.82 : hovering ? 1.25 : 1 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
        >
          <path
            d="M5 3 L19 11.5 L12.2 12.6 L9.6 19 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <motion.g
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: clicking ? 1 : 0, scale: clicking ? 1 : 0.6 }}
            transition={{ duration: 0.12 }}
            style={{ transformOrigin: "16px 8px" }}
          >
            <line x1="20.5" y1="3.5" x2="22.5" y2="1.5" />
            <line x1="22.5" y1="8" x2="20" y2="8" />
            <line x1="20.5" y1="12.5" x2="22.5" y2="14.5" />
          </motion.g>
        </svg>
      </motion.div>

      {/* CURSOR SETTINGS CONTROL BAR */}
      <div className="cursor-settings-container" ref={containerRef}>
        {showSettings && (
          <div className="cursor-settings-panel">
            <div className="cursor-settings-header">
              <span>CURSOR SYSTEM</span>
              <button onClick={() => setShowSettings(false)} className="cursor-settings-close">×</button>
            </div>
            <div className="cursor-settings-body">
              <div className="cursor-settings-label-row">
                <span>SENSITIVITY</span>
                <span className="cursor-settings-val">{sensitivity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={sensitivity}
                onChange={(e) => {
                  setSensitivity(parseInt(e.target.value, 10));
                }}
                className="cursor-settings-slider"
              />
              <div className="cursor-settings-subtext">
                {sensitivity <= 3 ? "FLOATY / RETRO" : sensitivity <= 7 ? "BALANCED / DEFAULT" : "SNAPPY / HIGH-PRECISION"}
              </div>
            </div>
          </div>
        )}

        <button
          className={`cursor-settings-btn ${showSettings ? "active" : ""}`}
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Cursor Sensitivity Settings"
          data-cursor
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sensitivity, setSensitivity] = useState(5);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(true);

    const saved = localStorage.getItem("cursor-sensitivity");
    if (saved) {
      setSensitivity(parseInt(saved, 10));
    }
  }, []);

  if (!isDesktop) return null;

  return (
    <CursorRenderer
      sensitivity={sensitivity}
      setSensitivity={(val) => {
        setSensitivity(val);
        localStorage.setItem("cursor-sensitivity", String(val));
      }}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
    />
  );
}