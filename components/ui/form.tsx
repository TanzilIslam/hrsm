import { FieldError } from "@/components/ui/field-error"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Shared form layout so every form has the same spacing:
// gap-5 between fields, gap-2 between a label, its control, and its error.
export function Form({ className, ...props }: React.ComponentProps<"form">) {
  return <form noValidate className={cn("grid gap-5", className)} {...props} />
}

export function FormField({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string[]
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      <FieldError id={`${id}-error`} messages={error} />
    </div>
  )
}

// Props every control inside FormField needs for error accessibility.
export function fieldA11y(id: string, error?: string[]) {
  return {
    "aria-invalid": !!error?.length,
    "aria-describedby": error?.length ? `${id}-error` : undefined,
  } as const
}
