"use client"

import { Fragment } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { useBreadcrumb } from "fumadocs-core/breadcrumb"
import type { Root } from "fumadocs-core/page-tree"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york-v4/ui/breadcrumb"

export function DocsBreadcrumb({
  tree,
  className,
}: {
  tree: Root
  className?: string
}) {
  const { pathname } = useLocation()
  const items = useBreadcrumb(pathname, tree)

  if (items.length === 0) return null

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/docs" className="hover:text-accent-foreground">
              Docs
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, i) => (
          <Fragment key={i}>
            {i !== 0 && <BreadcrumbSeparator />}
            {item.url ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={item.url}
                    className="truncate hover:text-accent-foreground"
                  >
                    {item.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
