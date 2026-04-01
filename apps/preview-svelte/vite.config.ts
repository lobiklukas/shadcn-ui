import path from "node:path"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/preview/svelte/",
  build: {
    assetsDir: "_assets",
  },
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "$app/environment": path.resolve(__dirname, "src/stubs/app-environment.ts"),
      "$app/stores": path.resolve(__dirname, "src/stubs/app-stores.ts"),
      "$app/navigation": path.resolve(__dirname, "src/stubs/app-navigation.ts"),
      "$app/forms": path.resolve(__dirname, "src/stubs/app-forms.ts"),
      "$app/state": path.resolve(__dirname, "src/stubs/app-state.ts"),
    },
  },
  server: {
    port: 3002,
    cors: true,
  },
  appType: "spa",
})
