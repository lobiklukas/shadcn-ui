import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "h-10 w-full min-w-0 appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-border-strong focus-visible:border-ring focus-visible:shadow-focus-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-input disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 aria-invalid:border-border-error aria-invalid:shadow-focus-ring-error [&[readonly]]:cursor-default [&[readonly]]:border-input [&[readonly]]:bg-muted [&[readonly]]:text-secondary",
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

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
