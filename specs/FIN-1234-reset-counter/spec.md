# Feature Specification: Reset Counter Button

**Feature Branch**: `feature/FIN-1234-reset-counter-test`

**Jira**: [FIN-1234](https://jira.hbl.linkyard-cloud.ch/browse/FIN-1234)

**Created**: 2026-09-29

**Status**: Implemented

**Input**: User description: "fin-1234: on the start screen of the application add a button which resets the counter to 0. display this new button only if the feature flag in the app config is set to true."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reset the counter to zero (Priority: P1)

A user on the start screen has increased the counter and wants to start counting again from zero. With the reset feature switched on, they see a reset button next to the counter and press it; the counter shows 0 again.

**Why this priority**: This is the core value of the ticket: users can start over without reloading the app.

**Independent Test**: With the feature flag switched on, open the start screen, increase the counter a few times, press the reset button and check that the counter shows 0.

**Acceptance Scenarios**:

1. **Given** the feature flag is switched on and the counter shows 5, **When** the user presses the reset button, **Then** the counter shows 0.
2. **Given** the feature flag is switched on and the counter shows 0, **When** the user presses the reset button, **Then** the counter still shows 0 and no error is shown.
3. **Given** the feature flag is switched on and the user has just reset the counter, **When** the user presses the counter button, **Then** the counter shows 1.

---

### User Story 2 - Show the reset button only when the feature is switched on (Priority: P1)

The team that runs the app decides whether users get the reset button by setting a feature flag in the app configuration. When the flag is not set to true, the start screen looks and behaves exactly as it does today.

**Why this priority**: The ticket requires the button to be controlled by the flag; without it the feature cannot be rolled out safely.

**Independent Test**: Open the start screen once with the flag set to true and once with the flag set to false or missing, and check whether the reset button is shown.

**Acceptance Scenarios**:

1. **Given** the feature flag is set to true, **When** the user opens the start screen, **Then** the reset button is shown next to the counter.
2. **Given** the feature flag is set to false, **When** the user opens the start screen, **Then** no reset button is shown and the counter works as before.
3. **Given** the feature flag is missing from the app configuration, **When** the user opens the start screen, **Then** no reset button is shown and the counter works as before.
4. **Given** the feature flag has a value other than true or false, or the app configuration cannot be read, **When** the user opens the start screen, **Then** no reset button is shown and the counter works as before.

---

### Edge Cases

- The counter is already 0 when the user presses reset: the counter stays at 0, nothing else happens.
- The feature flag is missing, invalid or the configuration cannot be read: the flag counts as off, the reset button is hidden, and the rest of the start screen still works.
- The flag is changed while a user has the app open: the change applies the next time the app is opened; the open screen does not change.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The start screen MUST show a reset button next to the counter when the reset feature flag in the app configuration is set to true.
- **FR-002**: The start screen MUST NOT show the reset button when the flag is set to false, is missing, has any value other than true, or the app configuration cannot be read.
- **FR-003**: Pressing the reset button MUST set the counter to 0 and show 0 immediately.
- **FR-004**: After a reset, the counter button MUST keep counting up from 0 as before.
- **FR-005**: The reset button MUST have a clear, accessible label (e.g., "Reset") so it can be found and used with a keyboard and assistive technology.
- **FR-006**: When the flag is off, the start screen MUST look and behave as it does today.

### Key Entities

- **Counter**: The number shown on the start screen; starts at 0, goes up by 1 per press of the counter button, and goes back to 0 on reset.
- **Reset feature flag**: An on/off setting in the app configuration that decides whether the reset button is shown; off unless explicitly set to true.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With the flag on, 100% of reset presses bring the counter back to 0 in a single press, with the new value visible at once.
- **SC-002**: With the flag off, missing or invalid, the reset button is shown in 0% of start screen visits.
- **SC-003**: The team can switch the reset button on or off by changing only the app configuration, without any code change.
- **SC-004**: Users can find and use the reset button with the keyboard alone.

## Documentation Impact *(mandatory)*

- **Technical**: New configuration option for the reset feature flag (name, type, default off, where it is read) in `docs/technical/configuration.md`.
- **Product**: New page in `docs/product/` describing the start screen counter and the reset flow (including that the reset button may not be available), linked from the Features list.

## Assumptions

- "Start screen" means the screen shown when the app opens, which contains the existing counter button.
- The counter is not saved; it starts at 0 when the app opens, and resetting it does not need confirmation.
- The flag is off by default; only the exact value true switches it on.
- The flag is read when the app opens; a change applies the next time the app is opened.
- The flag is not a secret and may be visible to anyone who can load the app.
- The reset button uses the same look as the existing counter button and shows the label "Reset".
- The flag applies to all users alike; per-user or percentage rollouts are out of scope.
