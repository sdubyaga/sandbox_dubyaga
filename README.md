# sandbox_dubyaga
This repository was created for testing purposes (execution of tasks of sandbox)

## Junior API Stage 1

The Stage 1 API tests use only [httpbin.org](https://httpbin.org) to practice HTTP requests, JSON bodies, headers, and status codes.

Run the suite with:

```bash
npm run test:api:junior-stage-1
```

The tests are in `tests/api/junior-stage-1/httpbin.spec.ts`. Their isolated settings, including the API base URL, are in `playwright.api.config.ts`; the existing `playwright.config.ts` remains responsible for UI tests.
