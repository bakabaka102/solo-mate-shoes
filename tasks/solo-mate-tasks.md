# SoleMate — Detailed Task Backlog (Frontend + Backend)

> Từ PRD & SRS SoleMate — Next.js + TailwindCSS frontend, NestJS + PostgreSQL backend, PayPal payments, WCAG 2.1 accessibility.

---

## Sprint 1 — Authentication & Basic Catalog

### Frontend
- **FE-1.1**: Implement accessible login page  
  - Create login form component with email/password inputs  
  - Add client-side validation & inline error messages  
  - Integrate `POST /api/auth/login`  
- **FE-1.2**: Implement accessible registration page  
  - Create registration form component with confirm password  
  - Integrate `POST /api/auth/register`  
- **FE-1.3**: Implement password reset flow  
  - Password reset request form  
  - Password reset confirm form  
- **FE-1.4**: Auth context & token handling  
  - React Context for auth state  
  - Secure HttpOnly cookie handling for refresh token  

### Backend
- **BE-1.1**: Auth module  
  - Create NestJS Auth module with controllers/services  
  - Implement JWT access + refresh tokens  
  - Secure password hashing (bcrypt)  
- **BE-1.2**: Password reset endpoints  
  - `POST /api/auth/password-reset-request`  
  - `POST /api/auth/password-reset-confirm`  
- **BE-1.3**: User entity & migration  

---

## Sprint 2 — Product Catalog, Search, Cart & Checkout

### Frontend
- **FE-2.1**: Product listing page  
  - SSR list of products  
  - Implement FiltersPanel with accessible controls  
- **FE-2.2**: Product detail page  
  - ProductGallery component with alt text, ARIA  
  - VariantSelector accessible radio group  
  - Add-to-cart button with aria-live feedback  
- **FE-2.3**: CartDrawer/CartPage  
  - Display items, update qty, remove item  
  - Persist guest cart in localStorage, sync on login  
- **FE-2.4**: Checkout page  
  - Accessible CheckoutForm: address, shipping, validation  
  - Integrate PayPal button (sandbox)  
  - Show order confirmation page  

### Backend
- **BE-2.1**: Products API  
  - `GET /api/products` with query filters  
  - `GET /api/products/:slug`  
  - Admin `POST/PUT/DELETE /api/admin/products`  
  - Image upload to S3  
- **BE-2.2**: Search  
  - Full-text search on title/description/tags  
  - Filters for category, price, size, color  
- **BE-2.3**: Cart & Order APIs  
  - Server-side cart sync endpoints  
  - `POST /api/checkout/paypal` create PayPal order  
  - `POST /api/webhooks/paypal` handle payment confirmation, create order  
- **BE-2.4**: Orders  
  - CRUD order states: CREATED → PROCESSING → COMPLETED/CANCELLED  
  - Order history endpoint for user  

---

## Sprint 3 — Reviews, Promotions, Admin Dashboard

### Frontend
- **FE-3.1**: Reviews component on product detail  
  - Show reviews, ratings  
  - Accessible review submission form  
- **FE-3.2**: Promotions UI  
  - Promo code input accessible with inline validation  
- **FE-3.3**: Admin dashboard shell  
  - Accessible navigation  
  - Dashboard panels: orders, revenue, top products  
- **FE-3.4**: Admin product management table  
  - Accessible sortable AdminTable  
  - Product create/edit form with image upload  

### Backend
- **BE-3.1**: Reviews API  
  - CRUD reviews with moderation flag  
- **BE-3.2**: Promotions API  
  - Admin create coupon codes with constraints  
  - Apply coupon at checkout  
- **BE-3.3**: Inventory & alerts  
  - Stock decremented on order completion  
  - Low-stock alerts for admins  
- **BE-3.4**: Basic analytics endpoints  
  - Orders per day, revenue, top products  

---

## Sprint 4 — Accessibility, Testing, Deployment

### Frontend
- **FE-4.1**: Accessibility pass for all pages  
  - Keyboard navigation, focus visible, ARIA attributes  
  - Automated axe tests integrated in Jest  
- **FE-4.2**: E2E tests with Playwright  
  - Browse, filter, add to cart, checkout, login, admin CRUD  
- **FE-4.3**: Lighthouse CI integration  

### Backend
- **BE-4.1**: Security hardening  
  - Input validation, rate limiting, bcrypt password hashing  
  - HTTPS and secure cookies in deployment  

### DevOps
- **DEV-4.1**: GitHub Actions pipeline  
  - Lint, test, build for frontend and backend  
  - Run accessibility checks  
- **DEV-4.2**: AWS infrastructure  
  - EC2 for backend NestJS  
  - RDS PostgreSQL  
  - S3 for images, CloudFront CDN  
- **DEV-4.3**: Environment variables & secrets  
  - PayPal sandbox credentials  
  - JWT secret keys  
  - Database credentials  
- **DEV-4.4**: Monitoring & logging  
  - CloudWatch logs and alarms  
  - Health check endpoint `/api/health`  

---

## Optional Sprint 5 — Polish & Documentation

- **DOC-5.1**: Developer guide & README  
- **DOC-5.2**: Runbook & maintenance plan  
- **DOC-5.3**: Accessibility conformance report WCAG 2.1  

---

*End of Detailed Task Backlog.*
