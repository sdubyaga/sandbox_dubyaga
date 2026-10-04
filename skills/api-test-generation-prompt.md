# API Test Generation Prompt

Use this prompt with an API's documentation or OpenAPI specification:

```text
Act as a QA engineer writing maintainable TypeScript API tests with Playwright.

API documentation/specification:
[Paste the relevant endpoint documentation or OpenAPI excerpt]

Requirements:
- Propose a concise scenario list before writing code.
- Cover success and meaningful negative cases, including status, response body, and relevant headers.
- Use strict equality for exact values and validate collection items with Array.every() where appropriate.
- Keep each test independent; create its own data and clean it up in finally or a test-scoped fixture.
- Validate response structure with Ajv schemas that allow additional fields unless the contract forbids them.
- Keep base URL and credentials in configuration or environment variables; never invent endpoint behavior.
- Reuse a small API helper only for repeated request behavior.

Return the scenario list, TypeScript test code, any helper/schema code, and assumptions that need live verification.
```

Applied to Junior Stage 3, this workflow produced the isolated booking lifecycle, authorization, negative-access, and schema-validation cases in `tests/api/junior-stage-3/restful-booker.spec.ts`.
