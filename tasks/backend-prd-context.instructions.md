Back-end PRD Task List Management (Node.js/Express/DB)

Guidelines for managing task lists in markdown files to track progress on completing a Product Requirements Document (PRD) in a Node.js back-end with Express, PostgreSQL (Prisma/Sequelize), Redis, and Docker.

Task Implementation

One sub-task at a time:
Do NOT start the next sub-task until you ask the user for permission and they say "yes" or "y".

Completion protocol:

Mark finished sub-tasks [x].

If parent task is fully [x]:

Run back-end test suite (npm test, integration/e2e).

If tests pass: git add ..

Clean up logs/temp files.

Commit with Conventional Commits:

git commit -m "feat: add order service API [PRD-5.2]" \
           -m "- Implements create and get order endpoints" \
           -m "- Adds unit and integration tests" \
           -m "Closes #456"

Task List Maintenance

Keep tasks/subtasks updated.

Add PRD references for all changes.

Maintain Relevant Files with:

Express routes/controllers

Services/business logic

Prisma/Sequelize models

Middleware (auth, logging, validation)

Test files

Configs (docker-compose.yml, .env.example)

Example Template (Back-end)
# PRD Task List: Back-end (Node.js/Express/DB)

## Tasks

- [ ] Implement authentication service [PRD-2.3]
    - [ ] Create `authMiddleware.ts` with JWT verification [PRD-2.3.1]
    - [ ] Add login & register endpoints in `authRoutes.ts` [PRD-2.3.2]
    - [ ] Write unit tests for auth service [PRD-2.3.3]

- [ ] Implement order service [PRD-5.2]
    - [ ] Create order model with Prisma schema [PRD-5.2.1]
    - [ ] Add REST API endpoints for orders [PRD-5.2.2]
    - [ ] Write integration tests [PRD-5.2.3]

## Relevant Files

- backend/src/middleware/authMiddleware.ts — JWT authentication logic.
- backend/src/routes/authRoutes.ts — Express routes for auth.
- backend/src/services/authService.ts — Business logic for authentication.
- backend/src/prisma/schema.prisma — Database schema for orders.
- backend/tests/auth.test.ts — Unit tests for auth logic.
- backend/tests/order.test.ts — Integration tests for orders.
- docker-compose.yml — Setup for Node.js + PostgreSQL + Redis.

## Reference Links

- PRD Document: [Section 5.2](https://example.com/prd/5.2)
- Node.js Docs: [Crypto](https://nodejs.org/api/crypto.html)
- Prisma Docs: [Models](https://www.prisma.io/docs/concepts/components/prisma-schema)
- Express Docs: [Middleware](https://expressjs.com/en/guide/using-middleware.html)