import { cn } from "@/lib/utils"

// Inline validation message shown under a form field. Pair with
// aria-invalid and aria-describedby={id} on the input.
export function FieldError({
  id,
  messages,
  className,
}: {
  id?: string
  messages?: string[]
  className?: string
}) {
  if (!messages?.length) return null
  return (
    <p
      id={id}
      role="alert"
      className={cn("text-sm text-destructive", className)}
    >
      {messages[0]}
    </p>
  )
}
