import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { createClientLoader } from "fumadocs-mdx/runtime/vite"
import { findNeighbour } from "fumadocs-core/page-tree"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

import { source } from "@/lib/source"
import { docs } from "@/.source"
import { mdxComponents } from "@/mdx-components"
import { absoluteUrl } from "@/lib/utils"
import { DocsBaseSwitcher } from "@/components/docs-base-switcher"
import { isReactBase } from "@/registry/frameworks"
import { DocsTableOfContents } from "@/components/docs-toc"
import { OpenInV0Cta } from "@/components/open-in-v0-cta"
import { Button } from "@/registry/new-york-v4/ui/button"

const clientLoader = createClientLoader(docs.doc, {
  id: "docs",
  component({ default: MDX }) {
    return <MDX components={mdxComponents} />
  },
})

export const Route = createFileRoute("/docs/$")({
  component: DocsPage,
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { title, description, url } = loaderData
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absoluteUrl(url) },
      ],
    }
  },
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? []
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    const isChangelog = slugs?.[0] === "changelog"
    const neighbours = isChangelog
      ? { previous: null, next: null }
      : findNeighbour(source.pageTree, page.url)

    await clientLoader.preload(page.path)

    return {
      path: page.path,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      toc: page.data.toc,
      slugs,
      neighbours: {
        previous: neighbours.previous
          ? { name: neighbours.previous.name, url: neighbours.previous.url }
          : null,
        next: neighbours.next
          ? { name: neighbours.next.name, url: neighbours.next.url }
          : null,
      },
    }
  },
})

function DocsPage() {
  const data = Route.useLoaderData()
  const Content = clientLoader.getComponent(data.path)
  const { slugs, neighbours, title, description, toc } = data

  return (
    <div
      data-slot="docs"
      className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h1>
              <div className="docs-nav flex items-center gap-2">
                <div className="ml-auto flex gap-2">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link to={neighbours.previous.url}>
                        <IconArrowLeft />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link to={neighbours.next.url}>
                        <span className="sr-only">Next</span>
                        <IconArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {description && (
              <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance md:max-w-[80%]">
                {description}
              </p>
            )}
          </div>
          <div className="w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
            {slugs &&
              slugs[0] === "components" &&
              slugs[1] &&
              slugs[2] &&
              isReactBase(slugs[1]) && (
                <div className="mb-4 flex flex-col gap-4">
                  <DocsBaseSwitcher
                    base={slugs[1]}
                    component={slugs[2]}
                  />
                </div>
              )}
            <Content />
          </div>
          <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
            {neighbours.previous && (
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="shadow-none"
              >
                <Link to={neighbours.previous.url}>
                  <IconArrowLeft /> {neighbours.previous.name}
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                asChild
              >
                <Link to={neighbours.next.url}>
                  {neighbours.next.name} <IconArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0"></div>
        {toc?.length ? (
          <div className="no-scrollbar flex flex-col gap-8 overflow-y-auto px-8">
            <DocsTableOfContents toc={toc} />
          </div>
        ) : null}
        <div className="hidden flex-1 flex-col gap-6 px-6 xl:flex">
          <OpenInV0Cta />
        </div>
      </div>
    </div>
  )
}
