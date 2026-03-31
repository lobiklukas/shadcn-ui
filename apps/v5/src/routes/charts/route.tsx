import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

import { Announcement } from "@/components/announcement"
import { ChartsNav } from "@/components/charts-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { Button } from "@/registry/new-york-v4/ui/button"

const title = "Beautiful Charts & Graphs"
const description =
  "A collection of ready-to-use chart components built with Recharts. From basic charts to rich data displays, copy and paste into your apps."

export const Route = createFileRoute("/charts")({
  component: ChartsLayout,
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

function ChartsLayout() {
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#charts">Browse Charts</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/docs/components/chart">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav id="charts">
        <ChartsNav />
      </PageNav>
      <div className="container-wrapper flex-1">
        <div className="container pb-6">
          <section className="theme-container">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  )
}
