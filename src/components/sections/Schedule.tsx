"use client";

import { useState } from "react";
import { SCHEDULE } from "@/data/content";

const days = Object.keys(SCHEDULE);

export default function Schedule() {
  const [day, setDay] = useState(days[0]);
  const [booked, setBooked] = useState<Record<string, boolean>>({});

  return (
    <section id="schedule" className="section schedule">
      <div className="wide">
        <h2 className="display h2">This week on the floor</h2>
        <p className="lede">Reserve a spot. Classes cap at fourteen so the coach sees every rep.</p>

        <div className="panel schedule-panel">
          <div className="tabs" role="tablist" aria-label="Day of the week">
            {days.map((d) => (
              <button
                key={d}
                role="tab"
                type="button"
                aria-selected={d === day}
                className={`tab${d === day ? " is-active" : ""}`}
                onClick={() => setDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <ul className="slots" role="tabpanel">
            {SCHEDULE[day].map((slot) => {
              const key = `${day}-${slot.time}`;
              const isBooked = Boolean(booked[key]);
              const left = slot.spots - (isBooked ? 1 : 0);
              return (
                <li className="slot" key={key}>
                  <span className="display slot-time">{slot.time}</span>
                  <span className="slot-info">
                    <strong>{slot.name}</strong>
                    <span className="meta">
                      with {slot.coach} · {left} {left === 1 ? "spot" : "spots"} left
                    </span>
                  </span>
                  <button
                    type="button"
                    className={`btn btn-small ${isBooked ? "btn-solid" : "btn-line"}`}
                    aria-pressed={isBooked}
                    onClick={() => setBooked((b) => ({ ...b, [key]: !b[key] }))}
                  >
                    {isBooked ? "Booked" : "Book spot"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
