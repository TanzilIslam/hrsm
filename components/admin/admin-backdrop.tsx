// Decorative navy backdrop (grid + glows) shared by the login showcase and the
// dashboard sidebar. Place it as the first child of a `relative overflow-hidden`
// container; it never captures pointer events.
export function AdminBackdrop({ glow = true }: { glow?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-navy"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {glow && (
        <>
          <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-orange/25 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 size-96 rounded-full bg-sky-400/10 blur-3xl" />
        </>
      )}
    </div>
  )
}
