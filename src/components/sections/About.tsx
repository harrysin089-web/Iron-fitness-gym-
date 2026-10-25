import { STATS } from "@/data/content";

const dots = ["red", "blue", "yellow", "green"];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="measure measure-right">
        <h2 className="display h2">A gym built around the bar</h2>
        <p className="lede">
          No mirrors-first layout, no crowded machine floor. Iron Fitness has twelve platforms, six racks and a
          coach on every shift, so the weight you came to move is always within reach.
        </p>
        <dl className="stats">
          {STATS.map((s, i) => (
            <div className="stat" key={s.label}>
              <span className="stat-dot" style={{ background: `var(--plate-${dots[i]})` }} aria-hidden="true" />
              <dt className="display stat-value">{s.value}</dt>
              <dd className="stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
