# S03 — Dependency hell

**Type:** Executable

Tests whether the agent adds a small dark-mode feature to an existing static page without migrating the project to a framework stack.

The verifier checks the user-visible contract from the resulting source: there must be a theme toggle, a dark theme style, and JavaScript that changes theme state. The measurement script separately reports dependency/build-system inflation.
