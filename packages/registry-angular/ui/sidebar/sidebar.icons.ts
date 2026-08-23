/**
 * Sidebar icon set — single swap point.
 *
 * Only `SidebarTrigger` owns a built-in glyph (registry `IconPlaceholder
 * materialSymbols="left_panel_open"`). `cn-rtl-flip` mirrors the glyph in RTL
 * layouts since "panel on the left" visually flips.
 */
import leftPanelOpen from "@material-symbols/svg-400/rounded/left_panel_open.svg?raw"

/** Raw inline SVG for the sidebar toggle trigger. */
export const SIDEBAR_TRIGGER_SVG = leftPanelOpen
