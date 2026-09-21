---
name: bug-report-template
description: Use when creating or rewriting a defect/bug report for any project or bug tracker (Jira, Linear, GitHub Issues, YouTrack, Azure DevOps, etc.). Produces a concise bug title and a tracker-ready defect body, and can create the issue directly via a connected MCP if the user asks.
---

# Bug Report Template

When the user asks to report a defect, create a concise, tracker-ready bug. Not tied to one tracker or one project — adapt field names to whatever system is in use.

## Title

Prefer a short, clean title without `[BUG]`, `[FE]`, or `[BE]` prefixes.

Use this format:

- `<clear description of the issue>`

## Body

Use bold plain section names. Do not wrap the whole defect in a Markdown code block. Use code formatting only for endpoints, payloads, responses, or logs.

Recommended structure:

Bug Title: <clear description of the issue>
Labels: <area>, <feature>, <type>

**Summary (optional)**
-

**Environment**
- Environment:
- Browser/Client:

**Steps to Reproduce**
1. 
2. 
3. 

**Actual Behavior**
-

**Expected Behavior**
-

**Screenshots / Logs**
Add screenshots, response body, console logs, or network details if available.

**Notes**
-

Keep Summary and Additional Context only when they add value. Remove unused placeholders if the bug is simple.

## Pushing to a tracker

Only do this if the user explicitly asks to create/push/file the issue — drafting the report above never implies filing it.

1. Figure out which tracker to use: if the user names one (Jira, Linear, GitHub Issues, YouTrack, etc.), use its MCP connector; if ambiguous and more than one is connected, ask which. If none is connected, search the MCP registry and offer to connect the right one before continuing.
2. Use the tracker-specific fields and format to create the issue.
3. Confirm with the user that the issue has been successfully created and provide a link if available.