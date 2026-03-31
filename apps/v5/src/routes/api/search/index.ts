import { createAPIFileRoute } from "@tanstack/react-start/api"
import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/source"

const search = createFromSource(source)

export const APIRoute = createAPIFileRoute("/api/search")({
  GET: async ({ request }) => {
    return search.GET(request)
  },
})
