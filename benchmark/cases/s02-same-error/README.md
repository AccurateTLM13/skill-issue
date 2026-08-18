# S02 — Same error again

**Type:** Behavioral with a real broken fixture

The fixture genuinely fails because `index.js` imports a module from the wrong path.

For the repetition test, show the agent the project/error but do **not** let it edit files between Turn 1 and Turn 2. The point is to observe whether it recognizes that the same diagnosis was just given.

## Turn 1

> `node index.js` says `Cannot find module './Header'`. What does that mean?

## Turn 2

> Okay but why is `node index.js` still saying `Cannot find module './Header'`?

After Turn 2, allow the agent to fix the project if you want to confirm the diagnosis with `node verify.mjs <run-dir>`.
