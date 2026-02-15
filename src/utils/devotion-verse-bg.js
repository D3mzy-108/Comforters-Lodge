// src/utils/verseBackgrounds.ts
const modules = import.meta.glob(
  "../assets/verse-backgrounds/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);

const verseBackgrounds = Object.values(modules);

// export function _pickRandomBackground() {
//   if (!verseBackgrounds.length) return undefined;
//   return verseBackgrounds[Math.floor(Math.random() * verseBackgrounds.length)];
// }

export function _pickDailyBackground(seed) {
  /* seed: the date of the post.
  This is to keep the background display stable per day, so it doesn't change on refresh */
  if (!verseBackgrounds.length) return undefined;

  // FNV-1a-ish tiny hash
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++)
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);

  const idx = (h >>> 0) % verseBackgrounds.length;
  return verseBackgrounds[idx];
}
