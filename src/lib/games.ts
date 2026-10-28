export type Game = {
  slug: string;
  title: string;
  studio: string;
  year: number;
  cover: string;
};

export const games: Game[] = [
  {
    slug: "hollow-knight",
    title: "Hollow Knight",
    studio: "Team Cherry",
    year: 2017,
    cover: "/hollow-knight.jpg",
  },
  {
    slug: "elden-ring",
    title: "Elden Ring",
    studio: "FromSoftware",
    year: 2022,
    cover: "/elden-ring.jpg",
  },
  {
    slug: "zelda-oot",
    title: "The Legend of Zelda: Ocarina of Time",
    studio: "Nintendo EAD",
    year: 1998,
    cover: "/zelda-oot.jpg",
  },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
