Front-end PRD Task List Management (React/Next.js)

Guidelines for managing task lists in markdown files to track progress on completing a Product Requirements Document (PRD) in a React.js + Next.js + Tailwind CSS front-end.

Task Implementation

One sub-task at a time:
Do NOT start the next sub-task until you ask the user for permission and they say "yes" or "y".

Completion protocol:

When you finish a sub-task, mark it [x].

If all subtasks in a parent task are [x]:

Run front-end test suite (npm run test, jest, playwright for e2e).

If tests pass: git add ..

Clean up debug code / unused imports.

Commit with Conventional Commits:

git commit -m "feat: implement product catalog UI [PRD-4.1]" \
           -m "- Adds responsive grid layout for products" \
           -m "- Integrates filtering and search components" \
           -m "Closes #234"

Task List Maintenance

Update the task list frequently.

Add new subtasks as needed, with PRD references.

Maintain a Relevant Files section with:

Next.js pages (/pages/...)

React components (/components/...)

Hooks/context (/hooks, /context)

Styles (/styles/...)

Example Template (Front-end)
# PRD Task List: Front-end (React/Next.js)

## Tasks

- [ ] Build product catalog page [PRD-4.1]
    - [ ] Implement `/products` page with SSR [PRD-4.1.1]
    - [ ] Add filtering & search bar component [PRD-4.1.2]
    - [ ] Add responsive grid UI [PRD-4.1.3]

- [ ] Implement authentication UI [PRD-2.3]
    - [ ] Build login/register forms [PRD-2.3.1]
    - [ ] Add JWT-based session handling via React Context [PRD-2.3.2]

## Relevant Files

- frontend/pages/products/index.tsx — Product catalog page with SSR.
- frontend/components/ProductCard.tsx — Displays individual product info.
- frontend/components/SearchBar.tsx — Filtering/search UI component.
- frontend/context/AuthContext.tsx — Provides authentication state.
- frontend/styles/globals.css — Tailwind global styles.

## Reference Links

- PRD Document: [Section 4.1](https://example.com/prd/4.1)
- Next.js Docs: [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- Tailwind Docs: [Responsive Design](https://tailwindcss.com/docs/responsive-design)