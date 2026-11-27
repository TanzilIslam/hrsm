// Dates are shown and edited in Bangladesh time.
export function formatPostDate(d: Date | string | null) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  })
}

// YYYY-MM-DD for a date input.
export function toDateInput(d: Date | null) {
  return d
    ? new Date(d).toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })
    : ""
}
