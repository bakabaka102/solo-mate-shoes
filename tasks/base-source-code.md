generate base source code for both front-end and back-end that follows modern best practices.

Include the following in your output:

🖥 Front-end

Use React.js with Next.js (for SSR) and Tailwind CSS.

Implement routing and placeholder pages for:

Home / Product catalog with filtering & search

Product details with reviews and ratings

Shopping cart & checkout

User profile and order history

Admin dashboard (products, orders, inventory, promotions).

Provide a clear folder structure (/components, /pages, /lib, /styles, etc.).

Add placeholder hooks or context for state management (e.g., React Context or Redux Toolkit).

Include accessibility (WCAG 2.1) placeholders and responsive layouts.

Add comments indicating where business logic and API calls will connect.

⚙ Back-end

Use Node.js with Express and PostgreSQL (via Sequelize or Prisma) plus Redis for caching.

Implement RESTful API endpoints for:

Authentication and user management.

Products (CRUD, filtering, search).

Orders (creation, status tracking, history).

Payments (Stripe/PayPal integration placeholders).

Inventory and promotions.

Use MVC structure with an API gateway pattern and microservice-ready separation (e.g., services folder).

Include Swagger/OpenAPI docs for endpoints.

Add middleware for security (helmet, rate limiting, input validation) and error handling.

Include placeholder unit tests (≥80% coverage target) and instructions to run them.

🛠 Infrastructure & Setup

Provide environment variable examples (.env.example) for DB, Redis, Stripe keys, etc.

Include Dockerfiles or Docker Compose for local development.

Prepare CI/CD placeholders (GitHub Actions/Jenkins config examples).

Add instructions for local setup, running servers, and connecting front-end to back-end.

📌 Additional Considerations

Ensure code is modular, scalable (50k concurrent users target), and PCI-DSS-ready.

Add placeholder analytics hooks and monitoring comments (CloudWatch/New Relic).

Provide clear inline comments for where additional features (like discount codes, CRM integration, or AWS deployment steps) will be added.