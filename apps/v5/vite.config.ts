import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
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
