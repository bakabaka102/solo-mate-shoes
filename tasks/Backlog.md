# SoleMate — Task Backlog (Frontend + Backend)

> Base on PRD and SRS cho SoleMate (Next.js + TailwindCSS frontend, NestJS + PostgreSQL backend, PayPal payments, WCAG 2.1 accessibility).

## Epic 1: Authentication & User Management
- **FE-1.1**: Build login page (email/password)
  - [ ] Create accessible login form with validation and error messages
  - [ ] Implement JWT access token handling in frontend (React Context)
- **FE-1.2**: Build register page
  - [ ] Accessible registration form, confirm password
  - [ ] Hook up API POST `/api/auth/register`
- **FE-1.3**: Build password reset flow
  - [ ] Request reset page, accessible email input
  - [ ] Password reset page, accessible form
- **BE-1.4**: API endpoints for auth
  - [ ] `POST /api/auth/register`
  - [ ] `POST /api/auth/login`
  - [ ] `POST /api/auth/refresh`
  - [ ] `POST /api/auth/password-reset-request`
  - [ ] `POST /api/auth/password-reset-confirm`
  - [ ] JWT + refresh token logic, revocation list

## Epic 2: Product Catalog & Search
- **FE-2.1**: Product listing page
  - [ ] SSR list of products with pagination
  - [ ] FiltersPanel component with accessible controls
- **FE-2.2**: Product detail page
  - [ ] ProductGallery component with alt text & ARIA
  - [ ] VariantSelector accessible radio group
  - [ ] Add-to-cart button with aria-live feedback
- **BE-2.3**: Products API
  - [ ] `GET /api/products` with query filters
  - [ ] `GET /api/products/:slug`
  - [ ] Admin `POST/PUT/DELETE /api/admin/products`
  - [ ] Upload images to S3
- **BE-2.4**: Search
  - [ ] Implement full-text search on title/description/tags
  - [ ] Filters for category, price, size, color

## Epic 3: Cart & Checkout (PayPal)
- **FE-3.1**: CartDrawer/CartPage
  - [ ] Display items, update qty, remove item
  - [ ] Persist guest cart in localStorage, sync on login
- **FE-3.2**: Checkout page
  - [ ] Accessible CheckoutForm: address, shipping, validation
  - [ ] Integrate PayPal button (sandbox)
  - [ ] Show order confirmation page
- **BE-3.3**: Cart & Order APIs
  - [ ] Server-side cart sync endpoints
  - [ ] `POST /api/checkout/paypal` — create PayPal order
  - [ ] `POST /api/webhooks/paypal` — handle payment confirmation and create order record
- **BE-3.4**: Orders
  - [ ] CRUD order states: CREATED → PROCESSING → COMPLETED/CANCELLED
  - [ ] Order history endpoint for user

## Epic 4: Reviews & Promotions
- **FE-4.1**: Reviews component on product detail
  - [ ] Show reviews, ratings
  - [ ] Accessible review submission form
- **BE-4.2**: Reviews API
  - [ ] CRUD reviews with moderation flag
- **FE-4.3**: Promotions UI (coupon input in cart)
  - [ ] Promo code input accessible with inline validation
- **BE-4.4**: Promotions API
  - [ ] Admin create coupon codes with constraints
  - [ ] Apply coupon at checkout

## Epic 5: Inventory Management & Admin Dashboard
- **FE-5.1**: Admin dashboard shell
  - [ ] Accessible navigation
  - [ ] Dashboard panels: orders, revenue, top products
- **FE-5.2**: Admin product management table
  - [ ] Accessible sortable AdminTable
  - [ ] Product create/edit form with image upload
- **BE-5.3**: Inventory & alerts
  - [ ] Stock decremented on order completion
  - [ ] Low-stock alerts for admins
- **BE-5.4**: Basic analytics endpoints
  - [ ] Orders per day, revenue, top products

## Epic 6: Accessibility & Testing
- **FE-6.1**: Accessibility pass for all pages
  - [ ] Keyboard navigation, focus visible, ARIA attributes
  - [ ] Automated axe tests integrated in Jest
- **FE-6.2**: E2E tests with Playwright
  - [ ] Browse, filter, add to cart, checkout, login, admin CRUD
- **FE-6.3**: Lighthouse CI integration for performance & accessibility scores
- **BE-6.4**: Security hardening
  - [ ] Input validation, rate limiting, bcrypt password hashing
  - [ ] HTTPS and secure cookies in deployment

## Epic 7: Deployment & CI/CD
- **DEV-7.1**: GitHub Actions pipeline
  - [ ] Lint, test, build for frontend and backend
  - [ ] Run accessibility checks
- **DEV-7.2**: AWS infrastructure
  - [ ] EC2 for backend NestJS
  - [ ] RDS PostgreSQL
  - [ ] S3 for images, CloudFront CDN
- **DEV-7.3**: Environment variables & secrets
  - [ ] PayPal sandbox credentials
  - [ ] JWT secret keys
  - [ ] Database credentials
- **DEV-7.4**: Monitoring & logging
  - [ ] CloudWatch logs and alarms
  - [ ] Health check endpoint `/api/health`

---

## Sprint-ready Subtasks
Each epic above can be broken into 2-week sprints for a training/student context:

- Sprint 1: Epic 1 + basic Epic 2 (Auth + product listing)
- Sprint 2: Epic 2 detail + Epic 3 (Cart + Checkout)
- Sprint 3: Epic 4 + Epic 5 (Reviews, Promotions, Admin)
- Sprint 4: Epic 6 + Epic 7 (Accessibility, Testing, Deployment)

---

*End of Task Backlog.*
