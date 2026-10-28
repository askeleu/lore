import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";

export function GameCoverCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group relative block aspect-[2/3] overflow-hidden border border-gold/20 bg-black/40 transition-colors hover:border-gold/60"
    >
      <Image
        src={game.cover}
        alt={game.title}
        fill
        sizes="(min-width: 768px) 320px, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/80 to-transparent px-4 pt-16 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-display text-sm tracking-[0.15em] text-gold uppercase sm:text-base">
          {game.title}
        </span>
      </div>
    </Link>
  );
}
