# Manual Test Case Format — Skill

This skill is used to generate test cases.

## Format

```markdown
<!-- suite -->

# Suite Title

Suite description (optional) — shared preconditions/business rules go here.

<!-- test
priority: normal
-->

# <Role> can <action> <object> <qualifier>

Optional description — the "why" behind the test.

## Steps

- Action
  *Expected*: observable result
- Action
  *Expected*: observable result
```

- Suite block: `<!-- suite -->` then `# Title`.
- Test block: `<!-- test ... -->` then `# Title`, optional description, then `## Steps`.
- Steps: top-level list item = action, nested `*Expected*:` = result. One assertion per `*Expected*` line.
- `${placeholder}` (backticks) for variable test data.
- **ID**: TC_XXXX (sequential number)
- Title structure: `<role> <action> <object> <qualifier>` — no `Verify that...`, no vague outcomes.
- Why → description. What → steps. Preconditions live in the description, not as steps.
- Save the test case file in the specified target directory `./test-cases/feature-name/`.

## Delegation guidance (any AI tool)

Not Claude-specific — applies to any AI coding assistant that supports delegating a sub-task (a background/read-only agent, a "plan" pass, etc.).
