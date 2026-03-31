import { createFileRoute } from "@tanstack/react-router"

import { getAllBlockIds } from "@/lib/blocks"
import { BlockDisplay } from "@/components/block-display"
import { getActiveStyle } from "@/registry/_legacy-styles"

export const Route = createFileRoute("/blocks/$")({
  component: BlocksCategoriesPage,
  loader: async ({ params }) => {
    const categories = params._splat?.split("/") ?? []
    const [activeStyle, blocks] = await Promise.all([
      getActiveStyle(),
      getAllBlockIds(["registry:block"], categories),
    ])
    return { activeStyle, blocks }
  },
})

function BlocksCategoriesPage() {
  const { activeStyle, blocks } = Route.useLoaderData()

  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {blocks.map((name: string) => (
        <BlockDisplay name={name} key={name} styleName={activeStyle.name} />
      ))}
    </div>
  )
}
