<!-- suite -->

# Modal Dialogs

URL: `https://demoqa.com/modal-dialogs`. The visitor can access the DemoQA site. Each test starts with the Modal Dialogs page open unless stated otherwise.

<!-- test
priority: normal
-->

# TC_0001 Visitor can view modal dialog controls

The visitor needs to identify the available modal actions before opening a dialog.

## Steps

- Navigate to `https://demoqa.com/modal-dialogs`.
  *Expected*: The `Modal Dialogs` heading is visible.
- Inspect the available modal controls.
  *Expected*: The `Small modal` and `Large modal` buttons are visible and enabled.
- Inspect the page without clicking a modal button.
  *Expected*: No modal dialog is visible.

<!-- test
priority: normal
-->

# TC_0002 Visitor can open the small modal dialog

The visitor needs to read the short dialog content. The Modal Dialogs page is open and no modal is visible.

## Steps

- Click `Small modal`.
  *Expected*: A modal dialog becomes visible.
- Inspect the modal title.
  *Expected*: The title `Small Modal` is visible.
- Inspect the modal body and controls.
  *Expected*: The body contains the small dialog text and a close button is visible.

<!-- test
priority: normal
-->

# TC_0003 Visitor can close the small modal dialog

The small modal dialog is open.

## Steps

- Click the close button in the small modal.
  *Expected*: The small modal is no longer visible.
- Inspect the page controls.
  *Expected*: The `Small modal` and `Large modal` buttons are visible again.
- Inspect the page for modal content.
  *Expected*: No modal content remains visible.

<!-- test
priority: normal
-->

# TC_0004 Visitor can open and inspect the large modal dialog

The visitor needs to read the long dialog content. The Modal Dialogs page is open and no modal is visible.

## Steps

- Click `Large modal`.
  *Expected*: A modal dialog becomes visible.
- Inspect the modal title.
  *Expected*: The title `Large Modal` is visible.
- Inspect the modal body.
  *Expected*: The large dialog content is visible and readable.
- Scroll inside the modal body.
  *Expected*: The modal body scrolls when needed, while the modal remains open.

<!-- test
priority: normal
-->

# TC_0005 Visitor can close the large modal dialog

The large modal dialog is open.

## Steps

- Click the close button in the large modal.
  *Expected*: The large modal is no longer visible.
- Inspect the page heading.
  *Expected*: The `Modal Dialogs` page remains open.
- Inspect the page controls.
  *Expected*: The `Small modal` and `Large modal` buttons are available.

<!-- test
priority: normal
-->

# TC_0006 Visitor can open a different modal after closing one

The Modal Dialogs page is open and no modal is visible.

## Steps

- Click `Small modal`.
  *Expected*: The small modal opens with the title `Small Modal`.
- Click the close button in the small modal.
  *Expected*: The small modal closes completely.
- Click `Large modal`.
  *Expected*: Only the large modal is visible, with the title `Large Modal` and its own body content.

<!-- test
priority: normal
-->

# TC_0007 Visitor cannot use page controls behind an open modal

The Modal Dialogs page is open and no modal is visible.

## Steps

- Click `Small modal`.
  *Expected*: The small modal opens and remains in the foreground.
- Attempt to interact with page content outside the modal.
  *Expected*: The page behind the modal cannot trigger an unintended modal action while the small modal is open.
- Close the small modal.
  *Expected*: The page controls become available for interaction.

<!-- test
priority: normal
-->

# TC_0008 Visitor can repeatedly open and close modal dialogs

The Modal Dialogs page is open and no modal is visible.

## Steps

- Open and close the small modal three times.
  *Expected*: Each cycle opens the `Small Modal` dialog and removes it after closing.
- Open and close the large modal three times.
  *Expected*: Each cycle opens the `Large Modal` dialog and removes it after closing.
- Inspect the page after the final close.
  *Expected*: The page remains responsive, no duplicate modal content is present, and both modal buttons are available.
