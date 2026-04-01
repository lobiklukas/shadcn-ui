import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { emberPlugins } from "./src/vite-plugins/ember"

const stubsDir = path.resolve(__dirname, "src/stubs")

export default defineConfig({
  base: "/preview/ember/",
  build: {
    assetsDir: "_assets",
  },
  plugins: [...emberPlugins(stubsDir), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".gjs", ".js", ".mts", ".gts", ".ts", ".json"],
  },
  server: {
    port: 3003,
    cors: true,
  },
  appType: "spa",
})
