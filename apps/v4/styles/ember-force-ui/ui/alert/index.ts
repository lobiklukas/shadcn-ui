import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export const alertVariants = cva(
  "group/alert relative grid w-full gap-1 rounded-lg border border-l-4 border-border px-4 py-4 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-l-primary bg-primary-subtle text-primary",
        destructive:
          "border-l-destructive bg-error-subtle text-error [&_a]:text-error [&_a]:underline *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>
