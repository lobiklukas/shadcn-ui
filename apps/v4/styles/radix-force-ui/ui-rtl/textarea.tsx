import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex field-sizing-content min-h-16 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-border-strong focus-visible:border-ring focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:border-input disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 aria-invalid:border-border-error aria-invalid:shadow-focus-ring-error [&[readonly]]:cursor-default [&[readonly]]:border-input [&[readonly]]:bg-muted [&[readonly]]:text-secondary",
  {
    variants: {
      variant: {
        outline: "bg-background", // [FORCE-UI]
        filled: "bg-muted", // [FORCE-UI]
        underline:
          "rounded-none border-0 border-b border-input bg-transparent px-0", // [FORCE-UI]
        ghost: "border-transparent bg-transparent hover:bg-interactive-hover", // [FORCE-UI]
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
