# SoleMate — PRD Frontend (Summary, Pages & Components)

This PRD focuses on the frontend implementation using **Next.js + TypeScript + TailwindCSS** with **WCAG 2.1 accessibility** as a primary requirement.

## Pages (user flows)
1. Home / Landing — hero, featured collections  
2. Product listing (category & search results)  
3. Product detail (images, variants, add to cart)  
4. Cart page  
5. Checkout (address, shipping, payment via PayPal)  
6. Account: login/register, profile, order history, address book, saved payment methods (PayPal linkage), password reset  
7. Admin: product manager, orders, promotions, inventory, users, basic analytics dashboards  

## Component details & responsibilities

### `Header`
- **Props:** `user`, `cartCount`, `onSearch(query)`
- **Responsibilities:** site navigation, accessible search box (autocomplete), cart button with aria-live updates for count, account menu.
- **Accessibility:** use landmark role `banner`, input with `aria-label`, ensure menu is keyboard operable.

### `Footer`
- **Props:** none (static links configurable)
- **Responsibilities:** sitemap links, accessibility statement, legal.

### `ProductCard`
- **Props:** `product`, `onAddToCart(productId, variantId)`
- **Responsibilities:** show image (alt text), title (link), price, rating, add-to-cart button.
- **Accessibility:** image `alt`, button `aria-label` including product name.

### `FiltersPanel`
- **Props:** `filters`, `onChange(filters)`
- **Responsibilities:** expose filter controls (checkboxes, ranges) in a keyboard-friendly list.
- **Accessibility:** use `fieldset` + `legend` for related controls, ensure focus order and clear labels.

### `ProductGallery`
- **Props:** `images[]`
- **Responsibilities:** responsive image carousel with thumbnails and zoom modal.
- **Accessibility:** carousel must expose current slide index, provide next/prev controls with `aria-controls` and support arrow key navigation; modal should trap focus.

### `VariantSelector`
- **Props:** `variants`, `selected`, `onSelect`
- **Responsibilities:** choose size/color; disabled states when out-of-stock.
- **Accessibility:** use radio groups (`role="radiogroup"`) or semantic `input[type=radio]` with labels.

### `CartDrawer` / `CartPage`
- **Props:** `items[]`, `onUpdateQty`, `onRemove`
- **Responsibilities:** edit quantities, show subtotal, promo code input.
- **Accessibility:** ensure focus returns to cart toggle after close; errors announced via `aria-live`.

### `CheckoutForm`
- **Props:** `initialAddress`, `onSubmit`
- **Responsibilities:** collect shipping address, shipping method, show PayPal button (SDK), validate inputs.
- **Accessibility:** label every input, group address fields logically, show inline validation messages.

### `AdminTable`
- **Props:** `columns`, `rows`, `onSort`, `onEdit`
- **Responsibilities:** accessible table with sortable headers and keyboard support.
- **Accessibility:** use `<table>` semantics, `aria-sort` on headers, skip links for long tables.

---

## State management & data fetching
- Use React Query (or SWR) for server state: caching, background refresh, and optimistic updates for cart actions.
- Local state for forms and ephemeral UI; persist cart in `localStorage` for guests and sync to server on login.
- Global auth state using React Context + secure HttpOnly cookies for refresh token handling (access token in memory). Avoid storing JWTs in localStorage.

## Routing & SEO
- Use Next.js pages and dynamic routing for product pages (`/products/[slug]`) and SSR/ISR for product listings to improve SEO and initial load performance.
- Use `next/head` to populate meta tags (title, description, open graph) per product.

---

## Accessibility (WCAG 2.1) — implementation checklist
- Semantic HTML for all components.
- Keyboard focus visible and logical tab order across pages.
- All images with meaningful `alt` text; decorative images marked empty `alt=""`.
- Color contrast: ensure text meets 4.5:1 ratio; larger text 3:1 where applicable.
- Forms: each input associated with `<label>`; inline errors announced and focus moved to first error.
- Modals and dialogs must trap focus and be dismissible by Escape.
- Skip-to-content link on top of each page.
- Use `aria-live` regions for dynamic changes (cart count, validation messages).
- Automated accessibility testing integrated in CI: `axe-core` (jest-axe) for unit tests and `axe` during E2E (Playwright) runs.

---

## Testing strategy (frontend)
- **Unit tests:** Jest + React Testing Library for components (focus on accessibility attributes and user interactions).
- **Integration/E2E:** Playwright tests for core flows — browse, filter, add to cart, checkout (PayPal sandbox), login, admin CRUD.
- **Accessibility tests:** include automated axe checks in both unit and E2E tests.
- **Performance checks:** Lighthouse CI on critical pages (product listing, product detail, checkout).

---

## Acceptance criteria (per page)
- **Home:** hero accessible, feature collections keyboard navigable, landmark roles present.
- **Product listing:** filters work via keyboard, product cards have accessible names, results update without focus loss.
- **Product detail:** variant selection accessible, images labeled, add-to-cart announces success via `aria-live`.
- **Cart & Checkout:** cart updates reflected in header; checkout form validates and PayPal flow completes; order confirmation page accessible and printable.
- **Account:** users can log in/register, view orders, update profile; password reset works; accessible forms.
- **Admin:** product create/edit flows accessible; tables sortable and keyboard operable.

---

## Deliverables produced in frontend PRD
- Component list + props (this document).
- Page wireframe descriptions and acceptance criteria (detailed pages created and saved).
- Accessibility checklist and CI integration plan.
- Test matrix for unit/integration/E2E.

---
