export function formatDate(dateString) {
  const dateOject = new Date(dateString);
  return dateOject.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
