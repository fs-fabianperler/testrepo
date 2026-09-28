<!--
Sync Impact Report
- Version change: 1.1.0 → 1.2.0 (MINOR: principle relaxed and workflow guidance expanded;
  everything that complied with 1.1.0 still complies)
- Modified principles:
  - III. Clean Architecture: strict domain/application/adapter layering replaced by
    separating business rules from UI and I/O; further layers only when a feature needs them
- Modified sections:
  - Development Workflow & Quality Gates: features start from a Jira ticket; branch named
    after the ticket key; /speckit-clarify removed; spec and implementation in one PR;
    PR links the ticket; CI also runs the dependency audit; optional plan.md/tasks.md
    via /speckit-plan and /speckit-tasks removed (skills no longer installed)
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

- Business rules MUST live in plain TypeScript modules, separate from UI components and I/O.
- Business-rule modules MUST NOT import UI frameworks, I/O, or infrastructure code;
  dependencies point from UI and infrastructure to business rules, never the reverse.
- Business rules MUST be testable without rendering UI and without network, database, or
  filesystem access.
- Each module MUST have a single, clear responsibility.
- Further layers (use cases, ports/adapters) MUST be added only when a feature needs them.

**Rationale**: Keeping business rules apart from the UI keeps them easy to test and change,
without the ceremony of full layering before it pays off (Principle I).

## Technology Constraints

- Language: TypeScript with `strict` compiler mode enabled; JavaScript files MUST NOT be added
  for application code.
- Runtime: Node.js (current LTS).
- Linting and formatting MUST be enforced by tooling configured in the repository.
- Scripts in `.specify/scripts/powershell/` are the supported Spec Kit automation on Windows.

## Development Workflow & Quality Gates

- Every feature MUST start from a business requirement in a Jira ticket.
- Work MUST happen on a feature branch named after the ticket key (e.g., `PROJ-123-short-name`).
- The spec MUST be created in `specs/` with `/speckit-specify` from the ticket content; the
  developer MAY review and edit the spec before planning.
- The implementation plan MUST be drafted and reviewed with Copilot in chat against the spec
  and this constitution, and the developer MUST approve it before implementation starts.
  The plan MUST cover the Constitution Check and any justification for added complexity.
- Implementation MUST be done with Copilot based on the approved plan, and the spec's
  acceptance scenarios MUST be verified before the pull request is opened.
- The spec and its implementation MUST be delivered in the same pull request.
- The pull request description MUST link the Jira ticket and the spec and summarize the
  approved plan, including any justification for added complexity, so reviewers can trace
  the decisions.
- All changes MUST be merged via pull request with an automated Copilot code review and at
  least one approving review by a developer.
- CI MUST pass before merge: lint, format check, type-check, automated tests, build, and
  dependency audit.
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

**Version**: 1.2.0 | **Ratified**: 2026-09-24 | **Last Amended**: 2026-09-28
