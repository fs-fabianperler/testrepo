# Configuration

This page lists every option the app reads at runtime or build time. CI runs [app/config-docs.test.ts](../../app/config-docs.test.ts), which fails when the code reads an option that has no row here, or when a row lists an option the code no longer reads.

## Rules

- In `app/src/`, read options only by their full name, `import.meta.env.VITE_NAME`. Vite exposes only variables prefixed with `VITE_` to the browser.
- In `app/vite.config.ts`, read options only as `process.env.NAME`.
- Values of `VITE_*` options are built into the public bundle. They must never hold secrets.
- Runtime options live as top-level keys in `app/public/config.json`. Operators can change them on the deployed app without a new build; the app loads the file on every page load and reads it only through `parseAppConfig` in `app/src/appConfig.ts`. The file is public: it must never hold secrets.
- Add one row per option. The name goes in the first column in backticks.

## Options

| Name | Where read | Type | Default | Required | Description |
| ---- | ---------- | ---- | ------- | -------- | ----------- |
| `resetCounterEnabled` | `app/public/config.json` (runtime) | boolean | `false` | No | Shows the "Reset counter" button on the start screen. Only `true` turns it on; a missing file, a missing key or any other value leaves it off. Takes effect on the next page load. |
