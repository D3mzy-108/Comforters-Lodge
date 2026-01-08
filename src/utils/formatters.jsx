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
