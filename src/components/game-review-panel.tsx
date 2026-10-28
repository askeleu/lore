"use client";

import { useState } from "react";

const criteria = [
  "Gameplay",
  "Art Direction",
  "Narrative",
  "Soundtrack",
] as const;
const statuses = ["Played", "Playing", "Backlog", "Wishlist"] as const;

// Placeholder community averages until real data exists.
const communityScores = {
  Gameplay: 4.8,
  "Art Direction": 4.5,
  Narrative: 4.2,
  Soundtrack: 4.9,
  Overall: 4.6,
} as const;

type Criterion = (typeof criteria)[number];
type Status = (typeof statuses)[number];

// Five equal-width cells, so a fill of N stars is exactly N * 20% of the row.
function StarRow({
  className,
  hover,
  style,
}: {
  className: string;
  hover: number;
  style?: React.CSSProperties;
}) {
  return (
    <div aria-hidden className={`flex ${className}`} style={style}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-[1.2em] text-center transition-transform duration-200 ease-out ${
            hover && n <= Math.ceil(hover) ? "scale-110" : "scale-100"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Left half of the star's box is n - 0.5, right half is n; split at its exact center.
function ratingAt(e: React.MouseEvent<HTMLElement>, n: number) {
  const { left, width } = e.currentTarget.getBoundingClientRect();
  return e.clientX < left + width / 2 ? n - 0.5 : n;
}

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
  const shown = hover || value;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`relative leading-none ${sizeClass}`}
      onMouseLeave={() => setHover(0)}
    >
      <StarRow className="text-gold/20" hover={hover} />
      {/* One gold layer for all five stars, revealed by a single sweep. */}
      <StarRow
        className="absolute inset-0 text-gold transition-[clip-path] duration-[250ms] ease-out"
        hover={hover}
        style={{ clipPath: `inset(0 ${100 - shown * 20}% 0 0)` }}
      />
      {/* One button per star; the pointer's position inside it picks half or full. */}
      <div className="absolute inset-0 flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={Math.ceil(value) === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseMove={(e) => setHover(ratingAt(e, n))}
            onClick={(e) => {
              // Keyboard clicks report detail 0 and no real position: treat as full.
              const rating = e.detail === 0 ? n : ratingAt(e, n);
              onChange(value === rating ? 0 : rating);
            }}
            className="w-[1.2em] cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

function CommunityStars({
  score,
  sizeClass = "text-base",
}: {
  score: number;
  sizeClass?: string;
}) {
  // Deciles: 4.6 -> 60% of the fifth star. Floor, never round up.
  const tenths = Math.floor(Math.round(score * 100) / 10);
  return (
    <div
      role="img"
      aria-label={`Community rating: ${score} out of 5`}
      className={`flex gap-1 leading-none ${sizeClass}`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(tenths - i * 10, 0), 10) * 10;
        return (
          <span key={i} className="relative text-community/20">
            ★
            <span
              aria-hidden
              className="absolute inset-0 text-community"
              style={{ clipPath: `inset(0 ${100 - fill}% 0 0)` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden
        className={`size-2 shrink-0 rounded-full ${className}`}
      />
      {label}
    </span>
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

      <div className="flex justify-center gap-6 font-display text-[0.65rem] tracking-[0.2em] text-foreground/70 uppercase">
        <LegendDot className="bg-gold" label="Your rating" />
        <LegendDot className="bg-community" label="Community" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-display text-xs tracking-[0.2em] text-foreground/80 uppercase">
          Your rating
        </span>
        <Stars
          label="Your rating"
          value={overall}
          onChange={setOverall}
          sizeClass="text-4xl"
        />
        <CommunityStars score={communityScores.Overall} sizeClass="text-xl" />
      </div>

      <dl className="flex flex-col divide-y divide-gold/10 border-y border-gold/10">
        {criteria.map((c) => (
          <div key={c} className="flex items-center justify-between gap-4 py-4">
            <dt className="font-display text-sm tracking-[0.15em] text-foreground/80 uppercase">
              {c}
            </dt>
            <dd className="flex flex-col items-end gap-1.5">
              <Stars
                label={c}
                value={ratings[c]}
                onChange={(v) => setRatings((r) => ({ ...r, [c]: v }))}
              />
              <CommunityStars score={communityScores[c]} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
