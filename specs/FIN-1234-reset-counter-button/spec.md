# Feature Specification: Reset Counter Button

**Feature Branch**: `feature/FIN-1234-reset-button`

**Jira**: [FIN-1234](https://jira.hbl.linkyard-cloud.ch/browse/FIN-1234)

**Created**: 2026-10-01

**Status**: Draft

**Input**: User description: "on the start screen of the application add a button which resets the counter to 0. display this new button only if the feature flag in the app config is set to true."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reset the counter (Priority: P1)

A user on the start screen has increased the counter and wants to start counting again from zero. They press a reset button next to the counter, and the counter shows 0.

**Why this priority**: This is the core value of the feature; without it there is nothing to switch on.

**Independent Test**: With the feature switched on, increase the counter a few times, press the reset button, and check that the counter shows 0.

**Acceptance Scenarios**:

1. **Given** the feature is switched on and the counter shows 3, **When** the user presses the reset button, **Then** the counter shows 0.
2. **Given** the feature is switched on and the counter shows 0, **When** the user presses the reset button, **Then** the counter still shows 0.
3. **Given** the feature is switched on and the counter was reset to 0, **When** the user presses the counter button, **Then** the counter shows 1.

---

### User Story 2 - Control availability with a feature flag (Priority: P2)

An operator decides whether users see the reset button by setting a feature flag in the app configuration, so the feature can be rolled out or withheld without changing the application.

**Why this priority**: Controls the rollout of User Story 1; it has no value on its own without the reset button.

**Independent Test**: Start the app once with the flag set to true and once with it set to false or not set, and check whether the reset button appears on the start screen.

**Acceptance Scenarios**:

1. **Given** the feature flag is set to true, **When** the user opens the start screen, **Then** the reset button is shown.
2. **Given** the feature flag is set to false, **When** the user opens the start screen, **Then** the reset button is not shown and the counter works as before.
3. **Given** the feature flag is not set, **When** the user opens the start screen, **Then** the reset button is not shown.
4. **Given** the feature flag has a value other than true or false, **When** the user opens the start screen, **Then** the reset button is not shown.

---

### Edge Cases

- The counter is already 0: pressing reset leaves it at 0 and causes no error.
- The flag is missing or holds an unrecognized value: the button is hidden (safe default).
- The flag value is matched case-sensitively: only the exact value `true` switches the feature on.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The start screen MUST show a reset button, labeled "Reset", next to the existing counter when the feature flag is set to true.
- **FR-002**: Pressing the reset button MUST set the counter to 0 and show 0 immediately.
- **FR-003**: The start screen MUST NOT show the reset button when the feature flag is set to false, not set, or set to any value other than true.
- **FR-004**: The existing counter behavior (each press increases the count by 1) MUST stay unchanged whether the flag is on or off.
- **FR-005**: The feature flag MUST be part of the app configuration and default to off.
- **FR-006**: The reset button MUST be operable by keyboard and have an accessible name that identifies it as resetting the counter.

### Key Entities

- **Counter**: The number shown on the start screen; starts at 0, increases by 1 per press, set back to 0 by reset.
- **Reset counter feature flag**: An on/off setting in the app configuration that decides whether the reset button is shown; off unless explicitly set to true.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With the flag on, users bring the counter back to 0 with a single press, from any count.
- **SC-002**: In 100% of starts with the flag off, not set, or invalid, the reset button is absent from the start screen.
- **SC-003**: In 100% of starts with the flag set to true, the reset button is present on the start screen.
- **SC-004**: All existing counter acceptance checks continue to pass with the flag on and off.

## Documentation Impact *(mandatory)*

- **Technical**: New configuration option for the reset counter feature flag (name, type, default off, allowed values) in `docs/technical/configuration.md`.
- **Product**: New feature page for resetting the counter, including the reset flow as a diagram, linked from `docs/product/README.md`.

## Assumptions

- "Start screen" is the app's only screen, which shows the existing counter.
- The counter value is not saved; it starts at 0 on every page load, as today.
- Changing the flag takes effect after the app is redeployed; switching it while the app is open is out of scope.
- Reset needs no confirmation dialog; the action is trivial and harmless.
- The button label is "Reset" in English, matching the existing English-only interface.
- No user roles or permissions are involved; all users see the same screen.
