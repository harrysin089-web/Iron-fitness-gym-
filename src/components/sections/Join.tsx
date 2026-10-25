"use client";

import { useState, type FormEvent } from "react";

export default function Join() {
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Hook this up to your backend, Formspree, or an email service.
    setSent(String(data.get("name") ?? ""));
  };

  return (
    <section id="join" className="section join">
      <div className="measure measure-right">
        <h2 className="display h2 join-title">Your first week is on us</h2>
        <p className="lede">Tell us what you want to lift. A coach will email you within one working day.</p>

        {sent !== null ? (
          <p className="notice" role="status">
            Thanks, {sent}. Your trial request is in. Check your inbox for a time to visit.
          </p>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <label>
              Full name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Main goal
              <select name="goal" defaultValue="strength">
                <option value="strength">Get stronger</option>
                <option value="muscle">Build muscle</option>
                <option value="fitness">Improve fitness</option>
                <option value="mobility">Move better</option>
              </select>
            </label>
            <button className="btn btn-solid" type="submit">
              Request my free week
            </button>
          </form>
        )}

        <footer className="footer">
          <p>
            <strong>Iron Fitness Gym</strong>
            <br />
            21 Foundry Lane, Your City
          </p>
          <p>
            Floor: open 24/7 for members
            <br />
            Staffed: 6:00 to 21:00 daily
          </p>
          <p className="meta">© {new Date().getFullYear()} Iron Fitness Gym</p>
        </footer>
      </div>
    </section>
  );
}
