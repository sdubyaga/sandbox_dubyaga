# Skill: E2E Test Scenario Generation

## Description
This skill is used to design comprehensive End-to-End (E2E) test scenarios that replicate real user journeys across the entire application ecosystem.

## E2E Testing Principles
When designing E2E test cases, follow these stability and efficiency guidelines:
- **User-Centric Journeys** — Focus on complete flows.
- **State Independence** — Ensure each test scenario sets up its own data and cleans up afterwards (Idempotency).
- **Critical Path Prioritization** — Cover core business flows (Happy Path) first, followed by critical alternative paths.

## E2E Test Format
Each E2E scenario must follow this structured layout:
1. **Scenario ID & Title**: `[Feature] Brief description of the user goal`
2. **Priority**: Critical (P0) or High (P1).
3. **Environment & Prerequisites**: Required user roles, initial data state, or API mocks.
4. **Test Implementation Steps**:
   - **Action**: What the user does (UI interactions or API triggers).
   - **Assertion / Validation**: What the system must verify at that specific moment (UI changes, DB entries, or network responses).
5. **Data Cleanup (Teardown)**: Actions required to reset the environment state.

## Workflow
1. **Use Page Objects**.
2. **One assertion per business action**.
3. **Test title starts with tag**.
4. **Use fixtures**.
5. **Keep tests independent**
6. **No hardcoded waits**.
7. **Avoid test interdependencies**
8. **Avoid flakiness by using reliable selectors and waiting mechanisms**.
9. **Keep tests maintainable and readable**.
10. **Review and update tests regularly**.
11. **Continuously monitor test execution and results for anomalies**.