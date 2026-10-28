import type { Metadata } from "next";
import { Game } from "@/components/game";

export const metadata: Metadata = {
  title: "Play",
};

export default function GamePage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">The Game</h1>
      <Game />
    </section>
  );
}
