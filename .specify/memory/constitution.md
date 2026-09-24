<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0 (MINOR: workflow gate relaxed; everything that complied with
  1.0.0 still complies, so this is not backward-incompatible)
- Modified principles:
  - I. Simplicity (YAGNI): complexity justification moved from plan.md Complexity Tracking
    to the chat plan and the PR description
- Modified sections:
  - Development Workflow & Quality Gates: default flow is now specify → (clarify) → plan in
    Copilot chat → implement with Copilot; plan.md/tasks.md are optional
  - Governance: compliance check moved from /speckit-plan to chat plan review and PR review
- Added sections: none
- Removed sections: none
- Follow-up TODOs: none
-->

# testproject Constitution

testproject demonstrates how spec-driven development can work for our team.

## Core Principles

### I. Simplicity (YAGNI)

- Implementations MUST solve only the requirements stated in the current spec; speculative
  features, options, and extension points MUST NOT be added.
- The simplest design that satisfies the spec MUST be chosen; any added complexity (new
  dependency, abstraction layer, pattern, or service) MUST be justified in the plan and in
  the pull request description.
- New runtime dependencies MUST be justified by a concrete need that the standard library or
  existing dependencies cannot reasonably meet.
- Dead code, unused exports, and commented-out code MUST be removed before merge.

**Rationale**: As a demonstration project, clarity is the product. Minimal code keeps specs,
plans, and implementation easy to trace against each other.

### II. Security by Default

- Code MUST be free of the OWASP Top 10 vulnerability classes (e.g., injection, broken access
  control, sensitive data exposure).
- All external input (HTTP requests, CLI args, files, environment) MUST be validated at the
  system boundary before use.
- Secrets MUST NOT be committed to the repository; they MUST be supplied via environment or a
  secret store.
- Dependencies MUST be kept free of known high/critical vulnerabilities (`npm audit` or
  equivalent) at merge time.
- Least privilege MUST apply to credentials, tokens, and runtime permissions.

**Rationale**: Secure defaults are cheaper than retrofits and set the right example for teams
adopting this workflow.

### III. Clean Architecture

- Code MUST be organized into layers with dependencies pointing inward only:
  domain (entities, business rules) → application (use cases) → adapters/infrastructure
  (HTTP, persistence, external services, UI).
- Domain and application layers MUST NOT import frameworks, I/O, or infrastructure modules;
  they depend on interfaces (ports) that outer layers implement.
- Each module MUST have a single, clear responsibility; cross-layer shortcuts are prohibited.
- Business rules MUST be testable without network, database, or filesystem access.

**Rationale**: Clear boundaries keep the codebase understandable, testable, and replaceable at
the edges, while staying consistent with Principle I (layers are added only when a feature
needs them).

## Technology Constraints

- Language: TypeScript with `strict` compiler mode enabled; JavaScript files MUST NOT be added
  for application code.
- Runtime: Node.js (current LTS).
- Linting and formatting MUST be enforced by tooling configured in the repository.
- Scripts in `.specify/scripts/powershell/` are the supported Spec Kit automation on Windows.

## Development Workflow & Quality Gates

- Every feature MUST start with a spec in `specs/` created by `/speckit-specify`; clarifying
  with `/speckit-clarify` is optional.
- The implementation plan MUST be drafted and reviewed with Copilot in chat against the spec
  and this constitution, and the developer MUST approve it before implementation starts.
  The plan MUST cover the Constitution Check and any justification for added complexity.
- Implementation MUST be done with Copilot based on the approved plan, and the spec's
  acceptance scenarios MUST be verified before the pull request is opened.
- The pull request description MUST link the spec and summarize the approved plan, including
  any justification for added complexity, so reviewers can trace the decisions.
- Writing plan.md/tasks.md with `/speckit-plan` and `/speckit-tasks` is OPTIONAL; use it when
  a feature is too large to plan reliably in a single chat session.
- All changes MUST be merged via pull request with at least one approving review.
- CI MUST pass before merge: lint, type-check, automated tests, and build.
- Reviewers MUST verify compliance with this constitution, including justification of any
  added complexity.

## Governance

- This constitution supersedes other project practices; conflicts are resolved in its favor.
- Amendments MUST be proposed via pull request that updates this file, states the rationale,
  and describes any migration impact on existing specs, plans, or code.
- Versioning follows semantic versioning:
  - MAJOR: removal or backward-incompatible redefinition of a principle or governance rule.
  - MINOR: new principle or section, or materially expanded guidance.
  - PATCH: clarifications and wording fixes with no semantic change.
- Compliance is checked during the chat plan review (Constitution Check) and in every PR
  review.

**Version**: 1.1.0 | **Ratified**: 2026-09-24 | **Last Amended**: 2026-09-24
