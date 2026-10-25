"use client";

import { useState } from "react";
import { PLANS, QUOTES } from "@/data/content";

export default function Membership() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="membership" className="section membership">
      <div className="wide">
        <h2 className="display h2">Membership</h2>
        <p className="lede">No joining fee. Cancel any month. Annual saves two months.</p>

        <div className="switch" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual
          </button>
        </div>

        <div className="plan-grid">
          {PLANS.map((p) => {
            const price = annual ? Math.round((p.monthly * 10) / 12) : p.monthly;
            return (
              <article className={`plan panel${p.featured ? " is-featured" : ""}`} key={p.name}>
                <span className="plan-plate" style={{ background: p.plate }} aria-hidden="true" />
                <h3 className="display plan-name">{p.name}</h3>
                <p className="plan-blurb">{p.blurb}</p>
                <p className="plan-price">
                  <span className="display plan-amount">${price}</span>
                  <span className="meta"> per month{annual ? ", billed yearly" : ""}</span>
                </p>
                <ul className="plan-list">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className={`btn ${p.featured ? "btn-solid" : "btn-line"}`} href="#join">
                  Choose {p.name}
                </a>
              </article>
            );
          })}
        </div>

        <div className="quotes">
          {QUOTES.map((q) => (
            <blockquote className="quote panel" key={q.who}>
              <p>“{q.text}”</p>
              <footer className="meta">{q.who}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
