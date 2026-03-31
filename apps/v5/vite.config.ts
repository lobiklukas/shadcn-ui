import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import mdx from "fumadocs-mdx/vite"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    mdx(await import("./source.config")),
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      customViteReactPlugin: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      // Ensure @/ always resolves to v5 root, even for symlinked files
      "@/": path.resolve(__dirname, "./") + "/",
      // Stub server-only (used in registry but not needed in TanStack Start)
      "server-only": path.resolve(__dirname, "src/stubs/server-only.ts"),
      "$app/environment": path.resolve(
        __dirname,
        "preview-server/src/stubs/app-environment.ts"
      ),
      "$app/stores": path.resolve(
        __dirname,
        "preview-server/src/stubs/app-stores.ts"
      ),
      "$app/navigation": path.resolve(
        __dirname,
        "preview-server/src/stubs/app-navigation.ts"
      ),
      "$app/forms": path.resolve(
        __dirname,
        "preview-server/src/stubs/app-forms.ts"
      ),
      "$app/state": path.resolve(
        __dirname,
        "preview-server/src/stubs/app-state.ts"
      ),
    },
  },
})
