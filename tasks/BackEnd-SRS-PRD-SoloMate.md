# SoleMate — SRS & PRD (Combined)

> **Status:** Draft — created based on Mock Project_SoleMate.pdf and the user's selections. Assumptions noted below.

---

## 0. Assumptions & decisions made (user inputs)
- **Project scope:** Full (A-2) — implement all features listed in the PDF: product catalog, search, cart, checkout, promotions, reviews, inventory alerts, analytics, admin dashboard, multi-payment support, etc.
- **Payment provider:** PayPal (user selected). Implement PayPal as primary payment method; Stripe may be added later.
- **Authentication:** Email/password with JWT + refresh tokens (D-A).
- **Non-functional priority:** Accessibility (WCAG 2.1) is the top priority (F).
- **Team context:** Training / student assignment — produce deliverables and graded outputs (G-3).
- **TypeScript:** Enabled (I-1).

**Ambiguous/unspecified choices (I made pragmatic defaults):**
- **Frontend:** Next.js (React) + TypeScript — chosen for server-side rendering & good SEO for commerce.
- **Backend:** NestJS (TypeScript) — structured, modular, testable, and microservice-ready.
- **Database:** PostgreSQL — relational, ACID for orders/inventory.
- **Design system / CSS:** TailwindCSS for rapid, accessible styling.
- **Deployment / Infra:** AWS (EC2, RDS, S3, CloudFront) per PDF recommendation.

> If you want different choices for frontend/backend/DB/design system, tell me and I'll update all artifacts.

---

# 1. Project Overview
**Product name:** SoleMate (mock project)

**Vision:** A full-featured e-commerce platform for footwear (shoes) that prioritizes an accessible, performant, and maintainable experience for customers and store admins.

**Primary users & personas:**
- Shopper (guest, registered): browses products, searches, reads reviews, purchases (PayPal), views orders.
- Admin / Merchandiser: product CRUD, promotions, inventory management, order management.
- Customer Support: view orders, issue refunds, contact users.

**High-level goals:**
1. Launch a functioning e-commerce MVP that supports product browsing, search, cart, PayPal checkout, and order management.
2. Ensure WCAG 2.1 AA accessibility compliance across core flows.
3. Provide a maintainable codebase with TypeScript, tests, CI/CD, and infra automation.

---

# 2. Scope
**Included (MVP full):**
- User management: registration, login, password reset, JWT refresh.
- Product catalog: categories, attributes (size, color), images, variants.
- Search and filters: keyword, category, price, size, color, availability.
- Cart and checkout: cart persistence, promo codes, PayPal checkout integration.
- Orders: order creation, status lifecycle, order history for users.
- Reviews & ratings: CRUD with moderation flags.
- Promotions: coupon codes, percentage/fixed discounts, time windows.
- Inventory: stock counts, low-stock alerts for admins.
- Admin dashboard: product CRUD, orders, users, promotions, inventory, basic analytics.
- Basic analytics: orders per day, revenue, conversion rate (simple dashboards).
- Security: input validation, parameterized queries, HTTPS, basic rate limiting.
- Accessibility: semantic HTML, keyboard navigation, ARIA, color contrast, labels.

**Out of scope for initial delivery (can be phased):**
- Multi-currency / internationalization beyond basic locale.
- Complex recommendation engine and real-time personalization.
- Advanced analytics & BI pipelines (ETL) — only summarized dashboards.
- Payment methods other than PayPal (can be added later).

---

# 3. Functional Requirements (brief)
Each requirement will be assigned an ID (FR-XXX) for traceability.

### Authentication & Users
- **FR-AUTH-001:** Users can register with email + password. Acceptance: user receives confirmation email (optional in training).
- **FR-AUTH-002:** Users can log in and receive access + refresh JWT tokens. Access token expires short (15m), refresh token (7d). Logout revokes refresh.
- **FR-AUTH-003:** Password reset flow via email.

### Product Catalog
- **FR-PROD-001:** Admin can create/read/update/delete products with fields: title, slug, description, price(s), category IDs, SKU, attributes (size, color), images, inventory count, variants.
- **FR-PROD-002:** Public endpoints for product list, detail, and related products.

### Search & Filter
- **FR-SEARCH-001:** Keyword search with relevance on title, description, tags.
- **FR-SEARCH-002:** Filters for category, price range, size, color, availability.

### Cart & Checkout
- **FR-CART-001:** Persistent cart for authenticated users; localStorage for guests.
- **FR-CHECKOUT-001:** Checkout flow supporting address collection, shipping selection (flat rates), tax estimation (basic), and PayPal payment integration.
- **FR-CHECKOUT-002:** Order creation on successful payment.

### Orders
- **FR-ORDER-001:** Order states: CREATED -> PROCESSING -> COMPLETED -> CANCELLED/REFUNDED.
- **FR-ORDER-002:** Users can view order history and detail.
- **FR-ORDER-003:** Admin can update order status and trigger refunds (mocked for training).

### Reviews & Ratings
- **FR-REV-001:** Authenticated users can create reviews with rating and text; moderation flag available.

### Promotions
- **FR-PROMO-001:** Admin can create coupon codes with constraints: percent/fixed, min order, expiry.
- **FR-PROMO-002:** Coupons applied at checkout with validation.

### Inventory & Alerts
- **FR-INV-001:** Stock is decremented on order completion.
- **FR-INV-002:** Admin receives low-stock alerts (dashboard list + optional email simulated).

### Admin Dashboard & Analytics
- **FR-ADMIN-001:** Admin users can manage products, orders, users, promotions.
- **FR-ADMIN-002:** Dashboard panels: daily orders, revenue, top products.

---

# 4. Non-Functional Requirements
- **NFR-ACC-001 (Accessibility):** Conform to WCAG 2.1 AA for all user-facing pages and checkout flow. Keyboard navigable components, proper ARIA attributes, semantic markup, and color contrast > 4.5:1 for text.
- **NFR-PERF-001:** First meaningful paint under 2.5s on 3G simulated devices for product listing (SSR where applicable).
- **NFR-SEC-001:** All sensitive flows over HTTPS; sanitize inputs; protect against XSS/CSRF; password hashing (bcrypt/argon2); JWTs signed with strong secret; refresh tokens stored server-side (or rotate with revocation list).
- **NFR-SCAL-001:** Design to scale horizontally: stateless API servers, RDS for data, S3 for assets.
- **NFR-MAINT-001:** Code should have unit tests covering critical functions and CI with automated lint/test.

---

# 5. System Architecture (high level)
- **Frontend:** Next.js (React + TypeScript), TailwindCSS, accessibility-first components.
- **Backend:** NestJS with modular architecture: Auth module, Users, Products, Orders, Payments, Promotions, Reviews, Admin.
- **DB:** PostgreSQL (RDS). Use migrations (TypeORM or Prisma recommended).
- **Storage:** S3 for images; CloudFront for CDN.
- **Payments:** PayPal REST integrations for checkout + webhooks for order confirmation.
- **CI/CD:** GitHub Actions -> build/test -> deploy to AWS (ECR/EC2, or ECS/EKS if available). Static frontend can be deployed to S3 + CloudFront or Vercel.
- **Monitoring:** CloudWatch + simple health check endpoints.

---

# 6. Data Model (summary)
**Core entities:** Users, Products, ProductVariants, Orders, OrderItems, Reviews, Promotions, Coupons, InventoryLogs.

**Key fields:**
- `users` (id, email, password_hash, name, role, created_at)
- `products` (id, title, slug, description, default_price, category_id)
- `product_variants` (id, product_id, sku, size, color, price, inventory_count)
- `orders` (id, user_id, total_amount, status, payment_provider, payment_ref, created_at)
- `order_items` (id, order_id, product_variant_id, qty, unit_price)
- `reviews` (id, product_id, user_id, rating, body, moderated, created_at)
- `coupons` (code, type, value, min_order, expires_at, usage_limit)

(Full ERD and SQL migrations will be produced in the HLD/DB deliverable.)

---

# 7. API Summary (sample endpoints)
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — returns { accessToken, refreshToken }
- `POST /api/auth/refresh` — exchange refresh token
- `GET /api/products` — list with query filters
- `GET /api/products/:slug` — product detail
- `POST /api/cart` — update cart (or use client-side + server-sync)
- `POST /api/checkout/paypal` — create PayPal order
- `POST /api/webhooks/paypal` — payment notification (verify and create/complete order)
- `GET /api/admin/products` — admin product CRUD endpoints (auth required)

Each endpoint will have input/output schemas and example payloads in the API spec deliverable.

---

# 8. Acceptance Criteria & Test Cases (overview)
- **Registration/Login:** Registered user can log in and access protected endpoints. Unit tests for auth flows.
- **Product listing:** Products show correctly, filters work, keyboard navigation possible.
- **Checkout:** Complete checkout end-to-end using PayPal sandbox; order appears in user history.
- **Accessibility tests:** Use automated axe/lighthouse checks; manual keyboard tests for key flows.

---

# 9. Deliverables & File Structure
Planned files (created as markdown under /docs/):
- `/docs/requirements/srs-solemate.md` (this document)
- `/docs/requirements/prd-frontend-solemate.md`
- `/docs/architecture/hld-solemate.md`
- `/docs/architecture/erd-solemate.png` + SQL migrations under `/db/migrations`
- `/tasks/` — parent tasks + subtasks (Sprint-ready)
- `/docs/test/test-plan.md`
- `/docs/deployment/deploy-checklist.md`

---

# 10. Next immediate steps (I'll perform now)
1. Produce **PRD (frontend)** with component breakdown, pages, and detailed user stories + acceptance criteria.
2. Generate **parent task list** (4–6 major epics) and a full **task backlog** broken into subtasks suitable for student teams.

I will generate those two artifacts now and save them alongside this SRS.

---

# Appendix: Notes for training / graders
- The deliverables will include comments on which items are graded for students — code quality, tests, accessibility compliance, and documentation.
- Include mock PayPal sandbox keys and instructions for testing payment flows locally.



---

*End of SRS.*

---

# PRD — Frontend (summary, pages & components)

## Overview
This PRD focuses on the frontend implementation using **Next.js + TypeScript + TailwindCSS** with WCAG 2.1 accessibility as a primary requirement.

## Pages (user flows)
1. Home / Landing — hero, featured collections
2. Product listing (category & search results)
3. Product detail (images, variants, add to cart)
4. Cart page
5. Checkout (address, shipping, payment via PayPal)
6. Account: login/register, order history
7. Admin: product manager, orders, promotions, inventory

## Key Components
- `Header` (search bar, cart count, account menu) — keyboard accessible.
- `ProductCard` (image, title, price, rating) — supports image alt, ARIA labels.
- `FiltersPanel` (collapsible, keyboard focus trap) — accessible controls.
- `ProductGallery` (responsive images, alt text, zoom)
- `VariantSelector` (size/color radio/combobox) — accessible labels.
- `CartDrawer` (slide-over, focus management)
- `CheckoutForm` (address fields, validations, inline error messages)
- `AdminTable` (sortable, accessible table for product list)

## Accessibility requirements (component-level)
- All interactive controls must be reachable via Tab; focus visible.
- Semantic HTML (buttons, labels). Forms linked with `label` + `id`.
- ARIA roles for complex widgets (dialog, combobox, slider if used).
- Color contrast check > 4.5:1.
- Skip-to-content link on every page.

## User stories (examples)
- **US-001 (Guest browse):** As a guest, I want to browse the product catalog and use filters so I can find shoes by size and color.
  - Acceptance: product list renders, filters narrow results, keyboard-only user can perform same actions.
- **US-002 (Checkout):** As a buyer, I want to checkout using PayPal so I can pay securely.
  - Acceptance: PayPal sandbox flow succeeds and returns to confirmation page; order recorded.
- **US-003 (Admin create product):** As an admin, I can add a new product with images and variants.
  - Acceptance: New product visible on public catalog after publish.

## Metrics (frontend)
- Lighthouse accessibility score target ≥ 90.
- Time to interactive (TTI) target < 3s on modern devices.

---

_End of PRD summary._



