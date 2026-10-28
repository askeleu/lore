import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GameReviewPanel } from "@/components/game-review-panel";
import { games, getGame } from "@/lib/games";

const reviews = [
  {
    author: "Placeholder Reviewer",
    body: "A placeholder review. Real impressions from members will appear here once reviews are wired up.",
  },
  {
    author: "Another Member",
    body: "Another placeholder review, standing in for a longer write-up about what made this game memorable.",
  },
];

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/game/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  return { title: game?.title ?? "Game" };
}

export default async function GameDetailPage({
  params,
}: PageProps<"/game/[slug]">) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-14 md:flex-row">
      <div className="relative mx-auto aspect-[2/3] w-56 shrink-0 self-start overflow-hidden border border-gold/20 md:mx-0 md:w-64">
        <Image
          src={game.cover}
          alt={game.title}
          fill
          sizes="256px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="font-display text-4xl font-bold tracking-[0.08em] text-gold sm:text-5xl">
            {game.title}
          </h1>
          <p className="text-sm tracking-wide text-foreground/60">
            {game.studio} · {game.year}
          </p>
        </header>

        <GameReviewPanel />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-lg tracking-[0.2em] text-gold uppercase">
            Reviews
          </h2>
          <ul className="flex flex-col gap-4">
            {reviews.map((review) => (
              <li
                key={review.author}
                className="border border-gold/15 p-5"
              >
                <p className="font-display text-sm tracking-[0.15em] text-foreground/80 uppercase">
                  {review.author}
                </p>
                <p className="mt-2 leading-relaxed text-foreground/60">
                  {review.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
