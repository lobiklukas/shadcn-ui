import { docs, create } from "@/.source"
import { loader } from "fumadocs-core/source"

export const source = loader({
  baseUrl: "/docs",
  source: await create.sourceAsync(docs.doc, docs.meta),
})
