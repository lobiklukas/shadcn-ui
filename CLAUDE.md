# Force UI — AI assistant context

Force UI is an **internal brand kit** forked from [shadcn/ui](https://github.com/shadcn-ui/ui). Read `CONTRIBUTING.md` for the full contributor guide. Key rules summarised here for quick reference.

## Monorepo layout

- `apps/v4/registry/bases/radix/` and `apps/v4/registry/bases/base/` — upstream React component sources. Edit minimally.
- `apps/v4/registry/styles/style-force-ui.css` — Force UI component styles. Safe to edit freely.
- `packages/theme-force-ui/src/index.ts` — brand tokens (OKLCH). Edit here for color changes.
- `packages/registry-{ember,vue,svelte}/` — framework ports. Upstream never touches these.

## [FORCE-UI] marker system

Every custom addition to an upstream-owned file must be tagged:

```ts
warning: "cn-badge-variant-warning",  // [FORCE-UI]
```

```css
/* [FORCE-UI-START] */
--font-sans: 'Noto Sans', sans-serif;
/* [FORCE-UI-END] */
```

After any upstream merge: `grep -rn "\[FORCE-UI\]" apps/v4/`

## Adding a variant

1. CSS in `style-force-ui.css` → `.cn-{component}-variant-{name} { @apply ... }`
2. One line in the component `.tsx` cva map → `name: "cn-{component}-variant-{name}",  // [FORCE-UI]`
3. Update both `radix/` and `base/` MDX API tables

## Style names

The only valid style is `force-ui`. In MDX: `styleName="radix-force-ui"` or `styleName="base-force-ui"`. Never reference removed styles (vega, nova, lyra, maia, mira).

## Do not

- Edit `:root` vars in `globals.css` directly — update `packages/theme-force-ui/src/index.ts` instead
- Add framework port files to `apps/v4/registry/bases/` — use `packages/registry-{framework}/`
- Modify upstream component files beyond the minimum needed — use `style-force-ui.css` for styling
