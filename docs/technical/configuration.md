# Configuration

This page lists every option the app reads at runtime or build time. CI runs [app/config-docs.test.ts](../../app/config-docs.test.ts), which fails when the code reads an option that has no row here, or when a row lists an option the code no longer reads.

## Rules

- In `app/src/`, read options only by their full name, `import.meta.env.VITE_NAME`. Vite exposes only variables prefixed with `VITE_` to the browser.
- In `app/vite.config.ts`, read options only as `process.env.NAME`.
- Values of `VITE_*` options are built into the public bundle. They must never hold secrets.
- Add one row per option. The name goes in the first column in backticks.

## Options

| Name | Where read | Type | Default | Required | Description |
| ---- | ---------- | ---- | ------- | -------- | ----------- |
| `VITE_RESET_COUNTER_ENABLED` | `app/src/main.tsx` | String; only `true` turns it on | Unset (off) | No | Shows the Reset button next to the counter on the start screen. Any other value, or no value, hides it. |

## Setting options

- Set `VITE_*` options in `app/.env.local` (not committed) or in the shell before running `npm run dev` or `npm run build`, e.g. `$env:VITE_RESET_COUNTER_ENABLED='true'`.
- Vite builds the values into the bundle, so a changed value takes effect only after a new build and deployment.
