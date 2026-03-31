import { createFileRoute } from "@tanstack/react-router"

import { getColors } from "@/lib/colors"
import { ColorPalette } from "@/components/color-palette"

export const Route = createFileRoute("/colors/")({
  component: ColorsPage,
  loader: () => {
    const colors = getColors()
    return { colors }
  },
})

function ColorsPage() {
  const { colors } = Route.useLoaderData()

  return (
    <div className="grid gap-8 lg:gap-16 xl:gap-20">
      {colors.map((colorPalette) => (
        <ColorPalette key={colorPalette.name} colorPalette={colorPalette} />
      ))}
    </div>
  )
}
