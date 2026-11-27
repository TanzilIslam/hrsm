export const inquiryStatusLabel = {
  new: "New",
  read: "Read",
  replied: "Replied",
  closed: "Closed",
} as const

export const inquiryStatusStyle = {
  new: "bg-brand-orange/20 text-orange-800",
  read: "bg-sky-100 text-sky-800",
  replied: "bg-emerald-100 text-emerald-800",
  closed: "bg-secondary text-muted-foreground",
} as const

export function formatReceived(d: Date | string) {
  return new Date(d).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  })
}
