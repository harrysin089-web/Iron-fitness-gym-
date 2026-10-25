import { COACHES } from "@/data/content";

export default function Coaches() {
  return (
    <section id="coaches" className="section coaches">
      <div className="wide">
        <h2 className="display h2">Coaches who still lift</h2>
        <p className="lede">Every coach trains on the same floor you do, at the same hours.</p>
        <div className="coach-grid">
          {COACHES.map((c) => (
            <article className="coach panel" key={c.name}>
              <div className="coach-avatar display" aria-hidden="true">
                {c.initials}
              </div>
              <h3 className="display coach-name">{c.name}</h3>
              <p className="coach-role">{c.role}</p>
              <p>{c.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
