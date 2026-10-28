import Link from "next/link";
import { GameCoverCard } from "@/components/game-cover-card";
import { games } from "@/lib/games";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,168,76,0.08),transparent_60%)]"
        />
        <h1 className="relative bg-gradient-to-b from-[#e6cf86] via-gold to-[#8a6f26] bg-clip-text font-display text-7xl font-bold tracking-[0.12em] text-transparent uppercase sm:text-9xl">
          Lore
        </h1>
        <div className="relative my-8 h-px w-24 bg-gold/50" />
        <p className="relative font-display text-lg tracking-[0.25em] text-foreground/70 uppercase sm:text-xl">
          Your games. Your canon.
        </p>
        <Link
          href="/game"
          className="relative mt-12 border border-gold px-8 py-3.5 font-display text-sm tracking-[0.25em] text-gold uppercase transition-colors hover:bg-gold hover:text-background"
        >
          Begin your library
        </Link>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {games.map((game) => (
            <GameCoverCard key={game.slug} game={game} />
          ))}
        </div>
      </section>
    </>
  );
}
