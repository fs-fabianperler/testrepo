# Counter

The start screen has a counter. Use it to count how many times you press a button, and start again from zero when you need to.

## Count

When you open the app, the counter shows 0. Each press of the counter button adds 1. The count is not saved: it starts at 0 again every time you open the app.

```mermaid
flowchart LR
  A[You open the start screen] --> B[Counter shows 0] --> C[You press the counter button] --> D[Counter goes up by 1]
```

## Reset the count

Next to the counter there can be a **Reset** button. Press it to set the count back to 0 at once. There is no confirmation. After a reset, the counter counts up from 0 again.

The Reset button is not available in every version of the app. If you don't see it, reload the app to count from 0 again.

```mermaid
flowchart LR
  A[Counter shows a number] --> B{Reset button shown?}
  B -- Yes --> C[You press Reset] --> D[Counter shows 0]
  B -- No --> E[You reload the app] --> D
```
