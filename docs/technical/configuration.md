# Configuration

This page lists every option the app reads at runtime or build time. CI runs [app/config-docs.test.ts](../../app/config-docs.test.ts), which fails when the code reads an option that has no row here, or when a row lists an option the code no longer reads.

## Rules

- In `app/src/`, read options only by their full name, `import.meta.env.VITE_NAME`. Vite exposes only variables prefixed with `VITE_` to the browser.
- In `app/vite.config.ts`, read options only as `process.env.NAME`.
- Values of `VITE_*` options are built into the public bundle. They must never hold secrets.
- Runtime options live as top-level keys in `app/public/config.json`. The app downloads this file on every page load, before showing the start screen, without caching. To change an option, edit the file on the deployed server; the change applies on the next page load. If the file is missing or invalid, every option uses its default. The file is public and must never hold secrets.
- Add one row per option. The name goes in the first column in backticks.

## Options

| Name | Where read | Type | Default | Required | Description |
| ---- | ---------- | ---- | ------- | -------- | ----------- |
| `resetCounterEnabled` | `app/public/config.json` (runtime) | boolean | `false` | No | Shows the Reset button on the start screen. Only the JSON value `true` turns it on; any other value or a missing key hides it. |
