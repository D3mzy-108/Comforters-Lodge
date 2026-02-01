export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatWeekDate(iso) {
  const inputDate = new Date(iso + "T00:00:00Z");
  const today = new Date();
  const yesterday = new Date();

  // Normalise to midnight for fair comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (inputDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  return inputDate.toLocaleDateString(undefined, {
    weekday: "long",
  });
}

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export const SPECIAL_CHARACTERS = [
  { keys: ["á", "à", "a"], value: "a" },
  { keys: ["é", "è", "e", "ẹ́", "ẹ̀", "ẹ"], value: "e" },
  { keys: ["í", "ì", "i"], value: "i" },
  { keys: ["ó", "ò", "o", "ọ́", "ọ̀", "ọ"], value: "o" },
  { keys: ["ú", "ù", "u"], value: "u" },
  { keys: ["ṣ", "s"], value: "s" },
  { keys: ["ń", "ǹ", "n"], value: "n" },
  { keys: ["ḿ", "m̀", "m"], value: "m" },
];

const CHAR_MAP = SPECIAL_CHARACTERS.reduce((map, entry) => {
  entry.keys.forEach((k) => {
    map[k] = entry.value;
  });
  return map;
}, {});

export function convertSpecialCharactersToPlainTxt(stringValue) {
  return [...stringValue].map((char) => CHAR_MAP[char] ?? char).join("");
}
