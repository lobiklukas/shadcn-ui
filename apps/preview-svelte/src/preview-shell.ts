export function syncTheme() {
  const params = new URLSearchParams(window.location.search)
  const themeParam = params.get("theme")

  if (themeParam === "dark") {
    document.documentElement.classList.add("dark")
    return
  }
  if (themeParam === "light") {
    document.documentElement.classList.remove("dark")
    return
  }

  // Default: match system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark")
  }

  // Listen for system changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      document.documentElement.classList.toggle("dark", e.matches)
    })

  // Listen for theme messages from parent
  window.addEventListener("message", (e) => {
    if (e.data?.type === "theme-change") {
      document.documentElement.classList.toggle("dark", e.data.theme === "dark")
    }
  })
}

export function getComponentName(): string | null {
  const base = import.meta.env.BASE_URL ?? "/"
  const path = window.location.pathname.replace(
    new RegExp(`^${base.replace(/\/$/, "")}`),
    ""
  )
  const segments = path.split("/").filter(Boolean)
  return segments[0] || null
}
