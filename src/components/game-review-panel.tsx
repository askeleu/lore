"use client";

import { useState } from "react";

const criteria = ["Gameplay", "Art Direction", "Narrative", "Soundtrack"] as const;
const statuses = ["Played", "Playing", "Backlog", "Wishlist"] as const;

type Criterion = (typeof criteria)[number];
type Status = (typeof statuses)[number];

function Stars({
  label,
  value,
  onChange,
  sizeClass = "text-2xl",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  sizeClass?: string;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const lit = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(value === n ? 0 : n)}
            className={`cursor-pointer ${sizeClass} leading-none transition-[color,transform] duration-200 ease-out ${
              lit ? "text-gold" : "text-gold/20"
            } ${hover && n <= hover ? "scale-110" : "scale-100"}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export function GameReviewPanel() {
  const [ratings, setRatings] = useState<Record<Criterion, number>>({
    Gameplay: 0,
    "Art Direction": 0,
    Narrative: 0,
    Soundtrack: 0,
  });
  const [overall, setOverall] = useState(0);
  const [status, setStatus] = useState<Status | null>(null);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="radiogroup"
        aria-label="Status"
        className="grid grid-cols-2 border border-gold/20 sm:grid-cols-4"
      >
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={status === s}
            onClick={() => setStatus(status === s ? null : s)}
            className={`cursor-pointer px-4 py-3 font-display text-xs tracking-[0.2em] uppercase transition-colors not-last:border-r not-last:border-gold/20 ${
              status === s
                ? "bg-gold text-background"
                : "text-foreground/70 hover:text-gold"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <span
          className="font-display text-xs tracking-[0.2em] text-foreground/80 uppercase"
        >
          Your rating
        </span>
        <Stars
          label="Your rating"
          value={overall}
          onChange={setOverall}
          sizeClass="text-4xl"
        />
      </div>

      <dl className="flex flex-col divide-y divide-gold/10 border-y border-gold/10">
        {criteria.map((c) => (
          <div key={c} className="flex items-center justify-between gap-4 py-4">
            <dt className="font-display text-sm tracking-[0.15em] text-foreground/80 uppercase">
              {c}
            </dt>
            <dd>
              <Stars
                label={c}
                value={ratings[c]}
                onChange={(v) => setRatings((r) => ({ ...r, [c]: v }))}
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
