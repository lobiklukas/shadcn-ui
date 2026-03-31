"use client"

import { Link, useLocation } from "@tanstack/react-router"

import { registryCategories } from "@/lib/categories"
import { ScrollArea, ScrollBar } from "@/registry/new-york-v4/ui/scroll-area"

export function BlocksNav() {
  const { pathname } = useLocation()

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="max-w-none">
        <div className="flex items-center">
          <BlocksNavLink
            category={{ name: "Featured", slug: "", hidden: false }}
            isActive={pathname === "/blocks"}
          />
          {registryCategories.map((category) => (
            <BlocksNavLink
              key={category.slug}
              category={category}
              isActive={pathname === `/blocks/${category.slug}`}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function BlocksNavLink({
  category,
  isActive,
}: {
  category: (typeof registryCategories)[number]
  isActive: boolean
}) {
  if (category.hidden) {
    return null
  }

  return (
    <Link
      to={`/blocks/${category.slug}`}
      key={category.slug}
      className="flex h-7 items-center justify-center px-4 text-center text-base font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary"
      data-active={isActive}
    >
      {category.name}
    </Link>
  )
}
