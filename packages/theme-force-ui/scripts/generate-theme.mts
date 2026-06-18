/**
 * Force UI theme generator
 *
 * Reads src/generated/tokens.ts (resolved Force Design Spec values) and
 * scripts/token-map.ts (the mapping config), then writes:
 *
 *   - src/index.ts                 shadcn RegistryItem theme definition
 *   - src/generated/runtime.css    shared runtime CSS for apps/previews
 *
 * Usage: pnpm generate-theme
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { light, dark } from "../src/generated/tokens.ts"
import {
  SHADCN_VARS,
  FORCE_EXTRAS,
  THEME_SPECIFIC,
  LITERAL_VARS,
  TAILWIND_THEME,
  BASE_RADIUS,
} from "./token-map.ts"

const __dir = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(__dir, "..")
const generatedDir = resolve(pkgRoot, "src/generated")

if (!existsSync(generatedDir)) {
  mkdirSync(generatedDir, { recursive: true })
}

// ── Value serialisers ────────────────────────────────────────────────────────

type ShadowLayer = {
  offsetX: string
  offsetY: string
  blur: string
  spread: string
  color: string
}

function isShadowLayer(value: unknown): value is ShadowLayer {
  return !!value && typeof value === "object" && "offsetX" in value && "offsetY" in value
}

function quoteFontFamily(value: string): string {
  if (value.startsWith("var(")) return value
  if (value.includes(" ") || value === "-apple-system") {
    return `'${value.replaceAll("'", "\\'")}'`
  }
  return value
}

function shadowToCss(layers: ShadowLayer[]): string {
  return layers
    .map(({ offsetX, offsetY, blur, spread, color }) =>
      `${offsetX} ${offsetY} ${blur} ${spread} ${color}`,
    )
    .join(", ")
}

function tokenValueToCss(tokenKey: string, value: unknown): string {
  if (Array.isArray(value)) {
    if (value.every(isShadowLayer)) {
      return shadowToCss(value)
    }

    if (tokenKey.startsWith("font.family.")) {
      return value.map((entry) => quoteFontFamily(String(entry))).join(", ")
    }

    if (tokenKey.startsWith("easing.")) {
      return `cubic-bezier(${value.map(String).join(", ")})`
    }

    return value.map(String).join(", ")
  }

  return String(value)
}

// ── Theme builder ────────────────────────────────────────────────────────────

type TokenMap = Record<string, unknown>

function buildTheme(
  tokens: TokenMap,
  themeSpecific: Record<string, string>,
): Record<string, string> {
  const out: Record<string, string> = {}
  let warnings = 0

  function resolve(varName: string, tokenKey: string): void {
    const value = tokens[tokenKey]
    if (value === undefined) {
      console.warn(`  ⚠  "${varName}": token "${tokenKey}" not found`)
      warnings++
      return
    }
    out[varName] = tokenValueToCss(tokenKey, value)
  }

  // 1. Standard shadcn variables
  for (const [varName, tokenKey] of Object.entries(SHADCN_VARS)) {
    resolve(varName, tokenKey)
  }

  // 2. Force-specific extras
  for (const [varName, tokenKey] of Object.entries(FORCE_EXTRAS)) {
    resolve(varName, tokenKey)
  }

  // 3. Theme-specific literals (may override earlier entries)
  for (const [varName, value] of Object.entries(themeSpecific)) {
    out[varName] = value
  }

  // 4. Literal vars (same in both themes)
  for (const [varName, value] of Object.entries(LITERAL_VARS)) {
    out[varName] = value
  }

  // 5. Elevation shadows (shadow.xs … shadow.xl → elevation-xs … elevation-xl)
  for (const size of ["xs", "sm", "md", "lg", "xl"]) {
    const key = `shadow.${size}`
    const layers = tokens[key]
    if (Array.isArray(layers) && layers.every(isShadowLayer)) {
      out[`elevation-${size}`] = shadowToCss(layers)
    }
  }

  // 6. Base radius for the shadcn-compatible radius contract.
  out.radius = BASE_RADIUS

  // 7. Full --force-* raw token layer (all semantic tokens, not just color).
  for (const [tokenKey, value] of Object.entries(tokens)) {
    out[`force-${tokenKey.replace(/\./g, "-")}`] = tokenValueToCss(
      tokenKey,
      value,
    )
  }

  if (warnings > 0) {
    console.warn(`  ⚠  ${warnings} mapping warning(s) while building theme`)
  }

  return out
}

// ── Build both themes ────────────────────────────────────────────────────────

const lightVars = buildTheme(light as TokenMap, THEME_SPECIFIC.light)
const darkVars = buildTheme(dark as TokenMap, THEME_SPECIFIC.dark)

// ── Render helpers ───────────────────────────────────────────────────────────

function renderTsBlock(vars: Record<string, string>, indent: string): string {
  return Object.entries(vars)
    .map(([k, v]) => `${indent}"${k}": ${JSON.stringify(v)},`)
    .join("\n")
}

function renderCssBlock(vars: Record<string, string>, indent: string): string {
  return Object.entries(vars)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n")
}

// ── Write src/index.ts ───────────────────────────────────────────────────────

const tsOutput = `// [FORCE-UI] Generated — do not edit manually.
// Run: pnpm generate-theme
// Source: packages/theme-force-ui/scripts/generate-theme.mts

import { type RegistryItem } from "shadcn/schema"

export const forceUITheme: RegistryItem = {
  name: "force-ui",
  title: "Force UI",
  type: "registry:theme",
  cssVars: {
    // @theme inline block — Tailwind utility → CSS var mapping
    theme: {
${renderTsBlock(TAILWIND_THEME, "      ")}
    },
    // :root — light theme values
    light: {
${renderTsBlock(lightVars, "      ")}
    },
    // .dark — dark theme overrides
    dark: {
${renderTsBlock(darkVars, "      ")}
    },
  },
}
`

writeFileSync(resolve(pkgRoot, "src/index.ts"), tsOutput)

// ── Write shared runtime CSS ─────────────────────────────────────────────────

const runtimeCss = `/* [FORCE-UI] Generated — do not edit manually. */
/* Run: pnpm generate-theme */
/* Source: packages/theme-force-ui/scripts/generate-theme.mts */

@theme inline {
${renderCssBlock(TAILWIND_THEME, "  ")}
}

:root {
${renderCssBlock(lightVars, "  ")}
}

.dark {
${renderCssBlock(darkVars, "  ")}
}
`

writeFileSync(resolve(generatedDir, "runtime.css"), runtimeCss)

// ── Summary ──────────────────────────────────────────────────────────────────

const forceCount = Object.keys(lightVars).filter((k) =>
  k.startsWith("force-"),
).length

console.log("✓  src/index.ts written")
console.log("✓  src/generated/runtime.css written")
console.log(`   @theme inline  ${Object.keys(TAILWIND_THEME).length} entries`)
console.log(
  `   :root          ${Object.keys(lightVars).length} variables  (${forceCount} --force-* raw tokens)`,
)
console.log(`   .dark          ${Object.keys(darkVars).length} variables`)
