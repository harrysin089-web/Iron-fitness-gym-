import type { CSSProperties } from "react";

const lines = ["Iron", "Fitness", "Gym"];

export default function Hero() {
  return (
    <section id="top" className="section hero">
      <div className="measure">
        <h1 className="display hero-title">
          {lines.map((line, i) => (
            <span className="line" key={line}>
              <span className="line-inner" style={{ "--i": i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="lede hero-lede">
          Heavy weights, honest coaching and a floor that never closes. Join in two minutes and train tonight.
        </p>
        <div className="actions hero-actions">
          <a className="btn btn-solid" href="#join">
            Start a 7-day trial
          </a>
          <a className="btn btn-line" href="#programs">
            See the programs
          </a>
        </div>
      </div>
      <p className="hint">Click the barbell to swap the plates</p>
    </section>
  );
}
