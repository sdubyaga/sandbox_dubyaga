# sandbox_dubyaga
This repository was created for testing purposes (execution of tasks of sandbox)

## Junior API Stage 1

The Stage 1 API tests use only [httpbin.org](https://httpbin.org) to practice HTTP requests, JSON bodies, headers, and status codes.

Run the suite with:

```bash
npm run test:api:junior-stage-1
```

The tests are in `tests/api/junior-stage-1/httpbin.spec.ts`. Their isolated settings, including the API base URL, are in `playwright.api.config.ts`; the existing `playwright.config.ts` remains responsible for UI tests.

## Junior API Stage 2

The Stage 2 API tests use Reqres for data-driven user-list checks, CRUD responses, and a missing-password validation case.

## Junior API Stage 3

The Stage 3 API tests use Restful Booker with isolated bookings, cleanup, Ajv schema validation, and authenticated update/delete operations.

Run the suite with:

```bash
npm run test:api:junior-stage-3
```

The API helper is `api/RestfulBookerApi.ts`; tests and schemas are under `tests/api/junior-stage-3` and `api/schemas`. Set `RESTFUL_BOOKER_BASE_URL`, `RESTFUL_BOOKER_USERNAME`, and `RESTFUL_BOOKER_PASSWORD` to override the public training defaults. The live service currently rejects the token cookie returned by `/auth` for protected booking updates, so the suite uses the documented Basic-auth alternative. The reusable AI test-generation prompt is in `skills/api-test-generation-prompt.md` and was used to structure the Stage 3 scenarios.
