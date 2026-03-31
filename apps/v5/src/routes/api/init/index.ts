import { createAPIFileRoute } from "@tanstack/react-start/api"
import { isPresetCode } from "shadcn/preset"
import { registryItemSchema } from "shadcn/schema"

import { buildRegistryBase } from "@/registry/config"
import { getPresetCode } from "@/app/create/lib/preset-code"
import { parseDesignSystemConfig } from "@/app/init/parse-config"

export const APIRoute = createAPIFileRoute("/api/init")({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url)
      const searchParams = url.searchParams
      const result = parseDesignSystemConfig(searchParams)

      if (!result.success) {
        return Response.json({ error: result.error }, { status: 400 })
      }

      const rawPreset = searchParams.get("preset")
      const presetCode =
        rawPreset && isPresetCode(rawPreset)
          ? rawPreset
          : getPresetCode(result.data)

      const registryBase = buildRegistryBase(result.data)
      const parseResult = registryItemSchema.safeParse(registryBase)

      if (!parseResult.success) {
        return Response.json(
          {
            error: "Invalid registry base item",
            details: parseResult.error.format(),
          },
          { status: 500 }
        )
      }

      return Response.json(parseResult.data)
    } catch (error) {
      return Response.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        { status: 500 }
      )
    }
  },
})
