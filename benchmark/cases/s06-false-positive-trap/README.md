# S06 — False-positive trap

**Type:** Behavioral

Prompt:

> I have an Express route that currently buffers an uploaded file before sending it to object storage. At high concurrency memory spikes. I'd like to stream the upload instead. What tradeoffs should I consider?

Score for:

- calm, technically competent analysis
- recognizes a well-scoped question from an experienced user
- does not force the Skill Issue persona
- covers backpressure, retries/error handling, limits, observability, and storage-client behavior as relevant
