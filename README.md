# testproject

A React web application created from the official [Vite](https://vite.dev/) `react-ts` template, used to show spec-driven development with Spec Kit.

Spec: [specs/001-react-app-template/spec.md](specs/001-react-app-template/spec.md)

## Prerequisites

- [Node.js](https://nodejs.org/) current LTS (minimum 20.19+ or 22.12+, as required by Vite)
- npm (bundled with Node.js)

## Getting started

All commands run from the `app/` folder:

```sh
cd app
npm install
npm run dev
```

The dev server prints the local address (default <http://localhost:5173>). It listens on localhost only. If the port is in use, it picks the next free port and prints it. Saved changes appear in the browser without a restart. Press `Ctrl+C` to stop.

## Commands

| Command                | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `npm install`          | Install dependencies                         |
| `npm run dev`          | Start the local development server           |
| `npm run lint`         | Lint the code (Oxlint)                       |
| `npm run typecheck`    | Type-check in TypeScript strict mode         |
| `npm test`             | Run automated tests (Vitest)                 |
| `npm run build`        | Create a production build in `app/dist`      |
| `npm run format:check` | Check formatting (Prettier)                  |
| `npm run format`       | Fix formatting                               |
| `npm run preview`      | Serve the production build locally           |
