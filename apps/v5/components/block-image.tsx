import { cn } from "@/lib/utils"

export function BlockImage({
  name,
  className,
}: React.ComponentProps<"div"> & { name: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[1440/900] w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <img
        src={`/r/styles/new-york/${name}-light.png`}
        alt={name}
        loading="lazy"
        className="object-cover dark:hidden"
        data-image="light"
      />
      <img
        src={`/r/styles/new-york/${name}-dark.png`}
        alt={name}
        loading="lazy"
        className="hidden object-cover dark:block"
        data-image="dark"
      />
    </div>
  )
}
