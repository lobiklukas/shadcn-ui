import { Link, createFileRoute } from "@tanstack/react-router"

import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/registry/new-york-v4/ui/button"

import { RootComponents } from "@/app/(root)/components"

const title = "The Foundation for your Design System"
const description =
  "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        property: "og:image",
        content: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  }),
})

function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm" className="h-[31px] rounded-lg">
            <Link to="/create">New Project</Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="rounded-lg">
            <Link to="/docs/components">View Components</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav className="hidden md:flex">
        <ExamplesNav className="flex-1 overflow-hidden [&>a:first-child]:text-primary" />
        <ThemeSelector className="mr-4 hidden md:flex" />
      </PageNav>
      <div className="container-wrapper flex-1 section-soft pb-6">
        <div className="container overflow-hidden">
          <section className="-mx-4 w-[160vw] overflow-hidden rounded-lg border border-border/50 md:hidden md:w-[150vw]">
            <img
              src="/r/styles/new-york-v4/dashboard-01-light.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="block dark:hidden"
              loading="eager"
            />
            <img
              src="/r/styles/new-york-v4/dashboard-01-dark.png"
              width={1400}
              height={875}
              alt="Dashboard"
              className="hidden dark:block"
              loading="eager"
            />
          </section>
          <section className="hidden theme-container md:block">
            <RootComponents />
          </section>
        </div>
      </div>
    </div>
  )
}
