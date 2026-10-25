"use client";

import { useState } from "react";
import { NAV } from "@/data/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Iron Fitness Gym, back to top">
        <span className="brand-plate" aria-hidden="true" />
        <span className="display brand-name">Iron Fitness</span>
      </a>

      <nav className={`nav-links${open ? " is-open" : ""}`} aria-label="Main">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="btn btn-solid btn-small" href="#join">
          Join now
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
