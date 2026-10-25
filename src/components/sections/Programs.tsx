"use client";

import { useState } from "react";
import { PROGRAMS } from "@/data/content";

export default function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programs" className="section programs">
      <div className="measure">
        <h2 className="display h2">Four programs, one standard</h2>
        <p className="lede">Pick the one that fits your week. You can switch any time.</p>

        <div className="accordion" role="list">
          {PROGRAMS.map((p, i) => {
            const open = i === active;
            return (
              <div className={`acc-item${open ? " is-open" : ""}`} role="listitem" key={p.name}>
                <button
                  type="button"
                  className="acc-head"
                  aria-expanded={open}
                  aria-controls={`prog-${i}`}
                  onClick={() => setActive(i)}
                >
                  <span className="plate-chip" aria-hidden="true">
                    {p.plate}
                  </span>
                  <span className="display acc-name">{p.name}</span>
                </button>
                <div id={`prog-${i}`} className="acc-body" hidden={!open}>
                  <p>{p.body}</p>
                  <p className="meta">{p.meta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
