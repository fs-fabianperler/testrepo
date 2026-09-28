# Project guidelines

- The project constitution in `.specify/memory/constitution.md` is binding. Follow it when planning and implementing, and check compliance when reviewing.
- The React app lives in `app/` (Vite, TypeScript strict, Oxlint, Prettier, Vitest). Run npm commands from `app/`.
- Every change implements a spec in `specs/FIN-123-feature/spec.md`. Do not add behavior the spec does not ask for.
- Update the docs listed in the spec's `Documentation Impact` section in the same change: every configuration option the app reads goes into `docs/technical/configuration.md`, every user-facing feature and flow into `docs/product/` (plain language for external readers, flows as Mermaid diagrams, no internal details).
- After implementing a spec and verifying its acceptance scenarios, change its `**Status**:` line from `Draft` to `Implemented` in the same change.
- Then output a pull request description in chat, following `.github/pull_request_template.md`, filled from the Jira ticket, the spec and the approved plan.
- Never commit, push or open a pull request on your own; the developer commits and pushes. Open the pull request only when the developer explicitly asks, using that description.

## Code review

- Check that the PR links the Jira ticket and the spec and summarizes the approved plan.
- Check that the spec's `**Status**:` is `Implemented`.
- Check that the code covers the spec's functional requirements and acceptance scenarios, and that tests exist for them.
- Check that configuration options added, changed or removed are reflected in `docs/technical/configuration.md`, and that user-facing features and flows are documented in `docs/product/`.
- Flag new dependencies, abstractions or patterns that the PR description does not justify.
- Flag business rules placed inside UI components, security issues (OWASP Top 10), committed secrets, and dead or commented-out code.
