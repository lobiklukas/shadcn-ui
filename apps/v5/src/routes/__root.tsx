/// <reference types="vite/client" />
import type { ReactNode } from "react"
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"

import { NuqsAdapter } from "nuqs/adapters/react"
import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { ActiveThemeProvider } from "@/components/active-theme"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/registry/bases/radix/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/registry/bases/radix/ui/tooltip"

import appCss from "../globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: META_THEME_COLORS.light },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Inter:wght@100..900&family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans+Hebrew:wght@100..900&display=swap",
      },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "shortcut icon", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        href: `${siteConfig.url}/rss.xml`,
      },
    ],
    scripts: [
      {
        children: `
          try {
            if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
              document.documentElement.classList.add('dark')
            }
            if (localStorage.layout) {
              document.documentElement.classList.add('layout-' + localStorage.layout)
            }
          } catch (_) {}
        `,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <div
        data-slot="layout"
        className="group/layout relative z-10 flex min-h-svh flex-col bg-background"
      >
        <SiteHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          "group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]"
        )}
      >
        <NuqsAdapter>
          <ThemeProvider>
            <LayoutProvider>
              <ActiveThemeProvider>
                <RadixTooltipProvider delayDuration={0}>
                  {children}
                  <Toaster position="top-center" />
                </RadixTooltipProvider>
              </ActiveThemeProvider>
            </LayoutProvider>
          </ThemeProvider>
        </NuqsAdapter>
        <Scripts />
      </body>
    </html>
  )
}
