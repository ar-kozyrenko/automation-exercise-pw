# Automation Exercise — Playwright Test Suite

[![UI Tests](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/ui-tests.yml/badge.svg)](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/ui-tests.yml)
[![Smoke Tests](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/smoke-tests.yml/badge.svg)](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/smoke-tests.yml)
[![Regression Tests](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/regression-tests.yml/badge.svg)](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/regression-tests.yml)
[![API Tests](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/api-tests.yml/badge.svg)](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/api-tests.yml)
[![Cross-Browser Tests](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/cross-browser.yml/badge.svg)](https://github.com/ar-kozyrenko/automation-exercise-pw/actions/workflows/cross-browser.yml)

UI and API test automation for [automationexercise.com](https://www.automationexercise.com), built with [Playwright](https://playwright.dev/) and TypeScript.

## Tech stack

- **Playwright** — browser automation and API testing
- **TypeScript**
- **@faker-js/faker** — random test data generation
- **ESLint + Prettier** — linting and formatting
- **GitHub Actions** — CI

## Architecture

- **`pages/`** — Page Object Model classes, one per page (`HomePage`, `CartPage`, `CheckoutPage`, ...).
- **`pages/components/`** — reusable UI fragments shared across pages (`NavBar`, `Footer`, `CartTable`, modals, ...), composed into page objects rather than duplicated.
- **`base/PageManager.ts`** — instantiates every page object once per test and exposes them as a single object, so tests don't juggle imports/constructors.
- **`api/client/apiClient.ts`** (`BaseApi`) — thin wrapper around Playwright's `APIRequestContext` (get/post/put/delete + headers).
- **`api/controllers/`** — one controller per API resource (`UserController`, `ProductController`, `BrandController`), built on top of `BaseApi`.
- **`base/APIManager.ts`** — same idea as `PageManager`, but for API controllers.
- **`fixtures/baseFixture.ts`** — Playwright fixtures that inject `pageManager` / `apiManager` into every test, block ad-network requests to reduce flakiness, and provide a `registeredUser` fixture (creates a user via the API before the test, deletes it afterward).
- **`steps/`** — reusable multi-step flows (e.g. registering a user, placing an order) shared across spec files that exercise the same business flow, so a UI change only needs to be updated in one place.
- **`test-data/`** — typed random test data generators (`general.test-data.ts`, `register-user.data.ts`).
- **`types/forms.ts`** — shared TypeScript types for form/API payloads.
- **`tests/ui/`** / **`tests/api/`** — the actual spec files.

## Getting started

```bash
npm ci
npx playwright install --with-deps
```

Optionally set a custom target in a `.env` file (defaults to the public `automationexercise.com`):

```
BASE_URL=https://www.automationexercise.com
```

## Running tests

| Command | What it runs |
| --- | --- |
| `npm test` | Everything (UI + API) |
| `npm run test:ui` | All UI tests (`tests/ui`) |
| `npm run test:api` | All API tests (`tests/api`) |
| `npm run test:smoke` | Tests tagged `@smoke` |
| `npm run test:regression` | Tests tagged `@regression` |
| `npm run test:cross-browser` | UI tests on Chromium + WebKit |
| `npm run report` | Open the last HTML report |

Tests run **headed** locally by default (see `playwright.config.ts`) and **headless** automatically on CI. Override with Playwright's own flags, e.g. `npx playwright test --headed=false`.

### Tags

Every UI test carries `@regression`; a subset of the more critical flows (registration, login, checkout, cart) also carries `@smoke`. API tests are untagged and are selected by directory (`tests/api`) rather than by tag.

## Code quality

```bash
npm run lint        # ESLint
npm run lint:fix     # ESLint --fix
npm run format       # Prettier --write
npm run format:check # Prettier --check
npm run typecheck    # tsc --noEmit
```

## CI

Five GitHub Actions workflows live in `.github/workflows/`, all triggered on push/PR to `main` and manually via `workflow_dispatch`:

- **`ui-tests.yml`** — all UI tests, Chromium.
- **`smoke-tests.yml`** — `@smoke`-tagged tests, Chromium.
- **`regression-tests.yml`** — `@regression`-tagged tests, Chromium.
- **`api-tests.yml`** — all API tests (no browser install — these only use Playwright's request context).
- **`cross-browser.yml`** — all UI tests on both Chromium and WebKit (matrix build).

> Note: since every UI test currently carries `@regression`, `ui-tests.yml` and `regression-tests.yml` run the same set of tests today. They'll diverge naturally once tests exist that aren't part of the regression suite (e.g. exploratory/WIP tests) or new tags are introduced.

Each workflow uploads its Playwright HTML report as a build artifact, whether the run passes or fails.
