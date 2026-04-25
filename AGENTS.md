# AGENTS.md

All development guidelines for this project have been consolidated into `CLAUDE.md`.

Please read `CLAUDE.md` before making any changes in this repository.

## Loading States (mandatory)

Never write raw `<div class="animate-spin ...">` inline. Always use the shared components from `@hivespace/shared`:

- **`<Spinner />`** — for inline/section loading (table, list, card content area). Props: `size` (`'sm'` | `'md'` | `'lg'`, default `'md'`).
- **`<FullscreenLoader :visible="bool" :message="string" />`** — for full-UI blocking operations (form submit, destructive actions). Place at template root so it teleports to `<body>`.

Decision rule: if the user cannot interact with the rest of the page while waiting → `FullscreenLoader`; otherwise → `Spinner`.

## Modal & Popup (mandatory)

Never create a local `ref<boolean>` to show or hide a modal. Always use `useModal()` from `@hivespace/shared`:

```typescript
import { useModal } from '@hivespace/shared'
const { openModal, closeModal } = useModal()
const result = await openModal(MyComponent, { ...props })
```

- Place `<ModalManager />` once in `App.vue` (root layout) — add it if it is missing
- Wrap modal content inside `<ModalWrapper title="..." />` for consistent chrome
- Use `<ConfirmModal />` for all destructive-action confirmations — do not build a custom one

## UI Coding from Design (mandatory)

When the user shares a design image to implement:

1. Scan `hivespace.ui-shared/src/components/` before writing any new markup
2. List which shared components match design elements and explicitly ask the user to confirm before coding
3. Propose updating an existing shared component (in `hivespace.ui-shared`) rather than creating a local copy when the component is 80% there
