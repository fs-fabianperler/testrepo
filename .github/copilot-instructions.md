# Project guidelines

- The project constitution in `.specify/memory/constitution.md` is binding. Follow it when planning and implementing, and check compliance when reviewing.
- The React app lives in `app/` (Vite, TypeScript strict, Oxlint, Prettier, Vitest). Run npm commands from `app/`.
- Every change implements a spec in `specs/NNN-feature/spec.md`. Do not add behavior the spec does not ask for.
- After implementing a spec and verifying its acceptance scenarios, change its `**Status**:` line from `Draft` to `Implemented` in the same change.

## Code review

- Check that the PR links the Jira ticket and the spec and summarizes the approved plan.
- Check that the spec's `**Status**:` is `Implemented`.
- Check that the code covers the spec's functional requirements and acceptance scenarios, and that tests exist for them.
- Flag new dependencies, abstractions or patterns that the PR description does not justify.
- Flag business rules placed inside UI components, security issues (OWASP Top 10), committed secrets, and dead or commented-out code.
