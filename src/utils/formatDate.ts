export function formatDate(date: Date | string): string {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
