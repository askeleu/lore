"use client";

import { useState } from "react";

export function Game() {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex min-h-96 flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-foreground/10 p-8">
      {started ? (
        <>
          <p className="text-foreground/70">The game begins here.</p>
          <button
            onClick={() => setStarted(false)}
            className="text-sm underline"
          >
            Reset
          </button>
        </>
      ) : (
        <button
          onClick={() => setStarted(true)}
          className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
        >
          New game
        </button>
      )}
    </div>
  );
}
