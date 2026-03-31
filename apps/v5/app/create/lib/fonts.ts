import { FONT_DEFINITIONS, type FontName } from "@/lib/font-definitions"

// Shim that mirrors the shape returned by next/font/google so that
// consumers (design-system-provider, font-picker, v0 code-gen) keep working
// without any Next.js dependency.
type PreviewFont = {
  variable: string
  style: { fontFamily: string }
}

function buildPreviewFont(def: (typeof FONT_DEFINITIONS)[number]): PreviewFont {
  return {
    variable: def.previewVariable,
    style: { fontFamily: def.family },
  }
}

const PREVIEW_FONTS = Object.fromEntries(
  FONT_DEFINITIONS.map((def) => [def.name, buildPreviewFont(def)])
) as Record<FontName, PreviewFont>

function createFontOption(name: FontName) {
  const definition = FONT_DEFINITIONS.find((font) => font.name === name)

  if (!definition) {
    throw new Error(`Unknown font definition: ${name}`)
  }

  return {
    name: definition.title,
    value: definition.name,
    font: PREVIEW_FONTS[name],
    type: definition.type,
  } as const
}

export const FONTS = [
  createFontOption("geist"),
  createFontOption("inter"),
  createFontOption("noto-sans"),
  createFontOption("nunito-sans"),
  createFontOption("figtree"),
  createFontOption("roboto"),
  createFontOption("raleway"),
  createFontOption("dm-sans"),
  createFontOption("public-sans"),
  createFontOption("outfit"),
  createFontOption("oxanium"),
  createFontOption("manrope"),
  createFontOption("space-grotesk"),
  createFontOption("montserrat"),
  createFontOption("ibm-plex-sans"),
  createFontOption("source-sans-3"),
  createFontOption("instrument-sans"),
  createFontOption("geist-mono"),
  createFontOption("jetbrains-mono"),
  createFontOption("noto-serif"),
  createFontOption("roboto-slab"),
  createFontOption("merriweather"),
  createFontOption("lora"),
  createFontOption("playfair-display"),
] as const

export type Font = (typeof FONTS)[number]

export const FONT_HEADING_OPTIONS = [
  {
    name: "Inherit",
    value: "inherit",
    font: null,
    type: "default",
  },
  ...FONTS,
] as const

export type FontHeadingOption = (typeof FONT_HEADING_OPTIONS)[number]
