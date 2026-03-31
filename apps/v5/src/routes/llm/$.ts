import { createAPIFileRoute } from "@tanstack/react-start/api"

import { processMdxForLLMs } from "@/lib/llm"
import { source } from "@/lib/source"
import { getActiveStyle, type Style } from "@/registry/_legacy-styles"

function getStyleFromSlug(slug: string[] | undefined, fallbackStyle: string) {
  if (slug && slug[0] === "components" && slug[1]) {
    if (slug[1] === "base") return "base-nova"
    if (slug[1] === "radix") return "new-york-v4"
  }
  return fallbackStyle
}

export const APIRoute = createAPIFileRoute("/llm/$")({
  GET: async ({ params }) => {
    const slug = params._splat?.split("/") ?? []
    const activeStyle = await getActiveStyle()
    const page = source.getPage(slug)

    if (!page) {
      return new Response("Not found", { status: 404 })
    }

    const effectiveStyle = getStyleFromSlug(slug, activeStyle.name)
    const processedContent = processMdxForLLMs(
      await page.data.getText("raw"),
      effectiveStyle as Style["name"]
    )

    return new Response(processedContent, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    })
  },
})
