# SoleMate — High Level Design (HLD)

## Overview
This High Level Design (HLD) describes the architecture for SoleMate: a WCAG 2.1 accessible e-commerce platform with Next.js + TypeScript frontend, NestJS + TypeScript backend, PostgreSQL database, S3 storage, and PayPal payments. It details components, data flow, deployment, and non-functional considerations.

## System Components
- **Frontend**: Next.js (React + TypeScript), TailwindCSS, React Query, accessible components.
- **Backend**: NestJS (TypeScript) with modules: Auth, Users, Products, Orders, Payments, Promotions, Reviews, Admin.
- **Database**: PostgreSQL (RDS) with relational schema for products, variants, orders, users, reviews, coupons.
- **Storage**: AWS S3 for product images, CloudFront CDN.
- **Payments**: PayPal REST SDK and webhooks for order confirmation.
- **CI/CD**: GitHub Actions for build/test/deploy. Deploy to AWS EC2 or ECS, RDS for DB.
- **Monitoring**: CloudWatch metrics and alarms, health check endpoints.

## Deployment Topology
- Public internet -> CloudFront -> S3 (static assets) / Next.js frontend (SSR) -> API Gateway / Load Balancer -> Backend (NestJS) instances -> RDS (Postgres)
- Webhooks (PayPal) -> Backend webhook endpoint (verify signature) -> Order processing.

## Data Flow (Checkout Example)
1. User fills CheckoutForm on frontend and clicks PayPal button.
2. Frontend calls `POST /api/checkout/paypal` to create a PayPal order on backend (server-side) and receives approval URL / order id.
3. User completes payment in PayPal. PayPal calls configured webhook to `POST /api/webhooks/paypal` with payment details.
4. Backend verifies the webhook signature, captures the order via PayPal API (if necessary), creates `orders` and `order_items` records, decrements inventory, and notifies user via email (mocked for training).

## Scalability & Availability
- Use stateless backend instances behind a load balancer for horizontal scaling.
- RDS read replicas for read-heavy workloads (product listings, analytics).
- S3 + CloudFront for assets reduces load on backend and improves performance.
- Use caching (in-memory LRU for product metadata or Redis for sessions if needed) — optional for training.

## Security Considerations
- HTTPS enforced everywhere.
- Passwords hashed with bcrypt/argon2.
- JWT access tokens short-lived; refresh tokens rotated and stored securely (HttpOnly cookies).
- Input validation and parameterized DB queries (use Prisma/TypeORM query builders).
- Webhook verification for PayPal (validate signatures).

## Backup & Recovery
- Automated RDS snapshots daily; manual snapshots before major migrations.
- S3 lifecycle rules and cross-region replication optional.
- Disaster recovery runbook: point-in-time recovery using RDS PITR and restoring S3 from replication/backups.

## CI/CD Pipeline (Summary)
1. PR opened -> run lint, unit tests, accessibility checks (axe), build.
2. On merge to main -> run integration/E2E tests (Playwright) and deploy to staging.
3. Manual approval -> deploy to production with DB migration step and health checks.

## Non-functional Requirements Mapping
- Accessibility: WCAG 2.1 AA — tested in CI via axe.
- Performance: TTI < 3s, FMP < 2.5s for product listing (SSR/ISR used).
- Maintainability: TypeScript across stack, modular code, clear docs, tests.

---

# ERD (Entity Relationship Diagram) — Summary
Below is the canonical data model used in SoleMate. A PNG diagram is provided alongside this document.

## Entities (summary)
- **users**: id, email, password_hash, name, role, created_at, updated_at
- **products**: id, title, slug, description, default_price, category_id, created_at, updated_at
- **product_variants**: id, product_id, sku, size, color, price, inventory_count
- **orders**: id, user_id, total_amount, status, payment_provider, payment_ref, created_at, updated_at
- **order_items**: id, order_id, product_variant_id, qty, unit_price
- **reviews**: id, product_id, user_id, rating, body, moderated, created_at
- **coupons**: id, code, type, value, min_order, expires_at, usage_limit, created_at
- **inventory_logs**: id, product_variant_id, change, reason, created_at

## Notes
- Relationships: products (1) -> product_variants (N); users (1) -> orders (N); orders (1) -> order_items (N); products (1) -> reviews (N).
- Use foreign keys with ON DELETE RESTRICT for critical relations (avoid accidental cascade deletes for products/orders).

---
