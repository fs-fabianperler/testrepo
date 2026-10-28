# Feature Specification: Reset Counter Button

**Feature Branch**: `feature/fin-1234-reset-button`

**Jira**: [FIN-1234](https://jira.hbl.linkyard-cloud.ch/browse/FIN-1234)

**Created**: 2026-10-28

**Status**: Implemented

**Input**: User description: "on the start screen of the application add a button which resets the counter to 0. activate this feature via feature flag"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reset the counter to zero (Priority: P1)

A user on the start screen has increased the counter and wants to start counting again from zero. They press a "Reset" button next to the counter, and the counter immediately shows 0.

**Why this priority**: This is the core value of the feature; without it there is nothing to switch on.

**Independent Test**: With the feature switched on, open the start screen, increase the counter a few times, press the reset button, and check that the counter shows 0.

**Acceptance Scenarios**:

1. **Given** the feature is switched on and the counter shows 3, **When** the user presses the reset button, **Then** the counter shows 0.
2. **Given** the feature is switched on and the counter shows 0, **When** the user presses the reset button, **Then** the counter still shows 0 and no error is shown.
3. **Given** the feature is switched on and the user has just reset the counter, **When** the user presses the counter button, **Then** the counter shows 1.

---

### User Story 2 - Control availability with a feature flag (Priority: P2)

An operator decides whether the reset button is offered to users. When the feature flag is off, the start screen looks and behaves exactly as it does today.

**Why this priority**: The flag lets the team release the code safely and turn the feature on when the business is ready, but it only matters once the reset button exists.

**Independent Test**: Run the application once with the flag off and once with the flag on, and check that the reset button is hidden and shown respectively.

**Acceptance Scenarios**:

1. **Given** the feature flag is off, **When** a user opens the start screen, **Then** no reset button is shown and the counter works as before.
2. **Given** the feature flag is on, **When** a user opens the start screen, **Then** the reset button is shown next to the counter.
3. **Given** the feature flag is not set at all, **When** a user opens the start screen, **Then** the application behaves as if the flag is off.
4. **Given** the feature flag holds a value that is neither "on" nor "off", **When** a user opens the start screen, **Then** the application behaves as if the flag is off.

---

### Edge Cases

- The counter is already 0: pressing reset leaves it at 0 without an error.
- The flag is missing or holds an unrecognized value: the feature stays off (safe default).
- The flag is changed while a user has the start screen open: the change takes effect the next time the start screen is loaded, not while it is open.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When the reset feature is switched on, the start screen MUST show a reset button next to the counter.
- **FR-002**: Pressing the reset button MUST set the counter to 0 immediately.
- **FR-003**: After a reset, the counter MUST continue to count up from 0 when the counter button is pressed.
- **FR-004**: When the reset feature is switched off, the start screen MUST NOT show the reset button and MUST otherwise behave exactly as before this feature.
- **FR-005**: The reset feature MUST be controlled by a single on/off feature flag that defaults to off when it is missing or holds an unrecognized value.
- **FR-006**: The feature flag MUST be switchable in a deployed application without a new build or release; a change MUST take effect the next time the start screen is loaded.
- **FR-007**: The reset button MUST be reachable and usable with the keyboard and MUST have a clear accessible label (e.g., "Reset counter").

### Key Entities

- **Counter**: The number shown on the start screen; starts at 0, increases by 1 per press of the counter button, and can be set back to 0 by the reset button.
- **Reset feature flag**: An on/off setting that decides whether the reset button is offered; off by default.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With the feature on, users return the counter to 0 with a single action, in under 1 second.
- **SC-002**: With the feature on, 100% of reset presses result in the counter showing 0.
- **SC-003**: With the feature off or the flag missing, 0 users see the reset button, and the start screen behaves identically to the version before this feature.
- **SC-004**: Users who try the reset button for the first time recognize its purpose without help (its label states what it does).

## Documentation Impact *(mandatory)*

- **Technical**: New configuration option for the reset feature flag (name, where it is read, allowed values, default off), added to `docs/technical/configuration.md`.
- **Product**: New feature page for the counter on the start screen, including the reset flow and a note that the reset button is only available where it has been enabled; linked from `docs/product/README.md`.

## Assumptions

- "Start screen" is the single page the application currently shows, which already contains the counter.
- The counter value is not kept between page loads; this feature does not change that.
- No confirmation step is needed before resetting, as the counter holds no valuable data.
- The flag applies to all users of a given deployment; there is no per-user targeting or gradual rollout.
- No new user roles or permissions are needed; every user who sees the start screen can use the reset button when it is shown.
