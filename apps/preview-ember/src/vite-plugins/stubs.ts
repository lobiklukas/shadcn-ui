import path from "node:path"
import type { Plugin } from "vite"

export function stubsPlugin(stubsDir: string): Plugin {
  const stubs: Record<string, string> = {
    "$app/environment": path.resolve(stubsDir, "app-environment.ts"),
    "$app/stores": path.resolve(stubsDir, "app-stores.ts"),
    "$app/navigation": path.resolve(stubsDir, "app-navigation.ts"),
    "$app/forms": path.resolve(stubsDir, "app-forms.ts"),
    "$app/state": path.resolve(stubsDir, "app-state.ts"),
  }

  return {
    name: "sveltekit-stubs",
    enforce: "pre",
    resolveId(source) {
      if (stubs[source]) {
        return stubs[source]
      }
      return null
    },
  }
}
