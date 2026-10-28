// One-off: crops the printed "24"" / "36"" poster dimensions off the edges of
// public/elden-ring.jpg. Measured on the 248x350 source: artwork spans
// x 3-217, y 2-324. Running it again would crop the already-cropped file.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const file = new URL("../public/elden-ring.jpg", import.meta.url);
const input = await readFile(file);

const output = await sharp(input)
  .extract({ left: 3, top: 2, width: 215, height: 323 })
  .jpeg({ quality: 95 })
  .toBuffer();

await writeFile(file, output);
const { width, height } = await sharp(output).metadata();
console.log(`Wrote public/elden-ring.jpg (${width}x${height})`);
