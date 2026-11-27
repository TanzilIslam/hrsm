export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="grid min-h-[40vh] place-items-center"
    >
      <span className="size-8 animate-spin rounded-full border-4 border-secondary border-t-brand-orange" />
    </div>
  )
}
