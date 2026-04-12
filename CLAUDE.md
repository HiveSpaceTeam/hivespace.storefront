# CLAUDE.md

## Tech Stack

- Vue 3 Composition API (`<script setup lang="ts">`)
- Vite · TypeScript · Tailwind CSS v4
- Pinia (state) · Vue Router 4 · vue-i18n
- `@hivespace/shared` — auth, HTTP client, layout shells, global store
- OIDC via `oidc-client-ts`

## Commands

```bash
npm run dev      # Dev server at http://localhost:5175
npm run build    # Production build (includes type-check via vue-tsc)
npm run preview  # Preview production build
```

No lint or format scripts are configured in this project.

## Environment Setup

Create `.env` in the project root:

```env
VITE_APP_CLIENT_ID=your-oidc-client-id
VITE_GATEWAY_BASE_URL=https://localhost:7001
VITE_APP_REDIRECT_URI=http://localhost:5175/callback/login
VITE_APP_POST_LOGOUT_REDIRECT_URI=http://localhost:5175/callback/logout
VITE_APP_SCOPE=openid profile email offline_access catalog order
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_LOGGING=true
VITE_ENABLE_DEBUG=true
```

Config singleton built at startup in `src/config/index.ts`. Gateway URL resolved via `VITE_GATEWAY_BASE_URL` → `VITE_API_BASE_URL` → `VITE_API_URL`.

## Architecture

```
src/
├── components/     # Reusable UI (common/, charts/, forms/, layout/, tables/)
├── views/          # Page-level route components
├── stores/         # Pinia stores — useUserStore (theme/culture/cookies)
├── services/       # api.ts (ApiService instance) + cart.service.ts, product.service.ts, checkout.service.ts
├── types/          # api/, store/, utils/ subdirs; all exported from index.ts
├── composables/    # Shared Composition API logic
├── router/         # Vue Router + beforeEach auth guard
├── i18n/           # locales/{en,vi}/{module}.json merged in src/i18n/index.ts
├── icons/          # SVG components exported via index.ts
└── config/         # Env config singleton
```

## Key Patterns

### Layout system

`App.vue` conditionally wraps routes in `StorefrontLayout` based on `route.meta.layout`. Routes with `layout: 'none'` (Cart, Checkout) render without the standard header/footer — they use dedicated headers (`CartHeader`, `CheckoutHeader`).

### Shared library (`@hivespace/shared`)

Do **not** re-implement anything already exported by `@hivespace/shared`:
- `useAuth`, `useAppStore`, `ApiService`, `AppUser` — auth, notifications, HTTP
- Layout shells: `Default`, `Maintenance`, `NotFound`, `ServerError`, `demoRoutes`
- Shared i18n base translations — merge with local overrides in `src/i18n/index.ts`

**Before building any new UI component**, check `hivespace.ui-shared/src/components/` for an existing implementation. The shared library provides components in `common/`, `charts/`, `layout/`, `modal/`, `tables/` — reuse before creating.

### API layer (`src/services/api.ts`)

`apiClient` is an `ApiService` instance configured with:
- Base URL from `config.api.baseUrl`
- `ensureFreshUser` callback → runs refresh-token exchange via `src/services/refresh.service.ts`; forces logout when `refresh_token` present but refresh fails
- `notifyCallback` → calls `useAppStore().notifyError(...)` for HTTP error toasts with i18n-sourced messages

Import `apiClient` from `@/services/api` in all service files.

### Auth flow (`src/router/index.ts`)

1. `meta.allowAnonymous: true` → skip auth
2. Unauthenticated on protected route → redirect to OIDC login
3. Authenticated → pass through

### State management

- Pinia stores only — no prop drilling
- `useAppStore` imported directly from `@hivespace/shared` — **do not re-export it** from local stores
- `useUserStore` manages theme and culture settings; syncs `dark` class on `<body>` and stores preferences in cookies
- Use `storeToRefs` when destructuring stores to preserve reactivity
- Toast: `useAppStore().notifySuccess/notifyError/notifyInfo`
- Stores are the single source of truth; components trigger actions and reactively display state

### API Integration Process

For each new backend domain, follow these four steps in order:

1. **Service** (`src/services/{module}.service.ts`) — HTTP calls only, no state
2. **Store** (`src/stores/{module}.ts`) — owns loading/error/data state; calls the service
3. **Expose via `storeToRefs`** — components import the store and destructure with `storeToRefs`; they must not call service methods directly
4. **Component triggers action** (e.g. `store.fetchData()`) and renders reactive state

### i18n

- Default locale: Vietnamese (`vi`); fallback: English (`en`)
- Files: `src/i18n/locales/{en,vi}/{module}.json`
- Shared translations merged first; local keys override
- Key prefix: `storefront.module.key` or `checkout.key`
- When adding a feature: create `{module}.json` for both `en` and `vi`, import in `src/i18n/index.ts`

## Feature Development Order

1. **Types** → `src/types/api/{module}.types.ts` and `src/types/store/{module}.types.ts`; export from `src/types/index.ts`
2. **Service** → `src/services/{module}.service.ts` using `apiClient`
3. **Store** → `src/stores/{module}.ts`; export from `src/stores/index.ts`
4. **Components** → `src/components/` (reusable) or `src/views/` (page-level)
5. **Route** → `src/router/index.ts` (add `meta.layout: 'none'` for cart/checkout-style pages)
6. **i18n** → `src/i18n/locales/en/{module}.json` + `vi/{module}.json`; import in `src/i18n/index.ts`

## Component Patterns

- **Container / Presentational**: Views (`src/views/`) orchestrate data and logic; components (`src/components/`) only render UI and emit events — no direct service calls from presentational components.
- **Composables**: Extract reusable stateful logic into `src/composables/` (e.g. `useModal.ts`, `usePagination.ts`). One composable per logical concern.
- **Icons**: New SVG icons go into `src/icons/` as `.vue` components and must be exported from `src/icons/index.ts`.

## Loading States

Always use the shared loading components from `@hivespace/shared`. Never write raw `<div class="animate-spin ...">` inline.

| Situation | Component | When to use |
|---|---|---|
| Data loading inside a page section (table, list, card) | `<Spinner />` | The rest of the page stays interactive; only the content area is replaced |
| Blocking the entire UI (form submit, destructive action) | `<FullscreenLoader :visible="bool" :message="string" />` | User must not interact until the operation finishes |

**`Spinner`** — props: `size` (`'sm'` \| `'md'` \| `'lg'`, default `'md'`). Import from `@hivespace/shared`.

```vue
<!-- inline section loading state -->
<div v-if="isLoading" class="flex justify-center py-16">
  <Spinner />
</div>
```

**`FullscreenLoader`** — props: `visible` (boolean, required), `message` (string, optional). Import from `@hivespace/shared`. Place it at the root of the template so it teleports to `<body>`.

```vue
<FullscreenLoader :visible="submitting" :message="$t('...processing')" />
```

If unsure which to use, ask: "Does the user need to wait for this before doing anything else on the page?" → yes → `FullscreenLoader`; no → `Spinner`.

## Types & Interfaces

```
src/types/
├── api/      # Request/response shapes and backend contracts
├── store/    # Pinia store state interfaces and action types
└── utils/    # Common utility/helper types
```

- Shared types: add to the appropriate subdir, export from `src/types/index.ts`
- Component-specific types: define inline in the component file unless reused elsewhere
- Import pattern: `import type { Foo } from '@/types'`

## Code Conventions

- **Components**: `<script setup lang="ts">` exclusively — no Options API
- **Styling**: Tailwind CSS utility classes only; custom CSS only when no utility class applies
- **Functions**: Arrow functions exclusively (except top-level declarations requiring hoisting)
- **Naming**: PascalCase `.vue` files; kebab-case `.ts` service/util files; camelCase variables/functions
- **Text**: All user-facing strings via `$t('storefront.module.key')` — no hardcoded text
- **Types**: `import type { Foo } from '@/types'` for shared types; component-local types stay in the component file
- **State**: Pinia for all shared state — `storeToRefs` when destructuring
- **Error handling**: `try/finally` with `useAppStore().setLoading(true/false)` in stores; display errors via `notifyError`
- **Props/emits**: Always typed with `defineProps<{...}>()` and `defineEmits<{...}>()`

## Development Workflow

1. Make incremental changes and verify in the browser between steps
2. Before adding any new UI, check `hivespace.ui-shared/src/components/` for an existing component
3. Test with both `npm run dev` (runtime) and `npm run build` (type-safe build)
