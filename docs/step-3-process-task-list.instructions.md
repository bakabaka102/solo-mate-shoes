Guidelines for managing task lists in markdown files to track progress on completing a Product Requirements Document (PRD) in React.js development (TypeScript/JavaScript-based).

Task Implementation

One sub-task at a time:
Do NOT start the next sub-task until you ask the user for permission and they say "yes" or "y".
Completion protocol:

When you finish a sub-task, immediately mark it as completed by changing [ ] to [x].
If all subtasks underneath a parent task are now [x], follow this sequence:


First: Run the appropriate React test suite (npm test, yarn test, npm run test:coverage).
Type checking: Run TypeScript compiler check (npm run type-check or tsc --noEmit).
Linting: Run ESLint to ensure code quality (npm run lint).
Only if all tests and checks pass: Stage changes (git add .).
Clean up: Remove any temporary files, debug code, console.logs, or artifacts before committing.
Build check: Ensure production build works (npm run build).
Commit: Use a descriptive commit message that:

Uses conventional commit format (feat:, fix:, refactor:, test:, docs:, style:, perf:).
Summarizes what was accomplished in the parent task.
Lists key changes and additions.
References the PRD section and relevant issue/ticket IDs.
Formats the message as a single-line command using -m flags, e.g.:

bash        git commit -m "feat: implement UserProfile component [PRD-2.3]" \
                    -m "- Adds UserProfile component with TypeScript interfaces" \
                    -m "- Integrates with user context and API service" \
                    -m "- Implements responsive design and accessibility" \
                    -m "- Adds comprehensive test coverage (95%)" \
                    -m "Closes #123"

Once all the subtasks are marked completed and changes have been committed, mark the parent task as completed.

Stop after each sub-task and wait for the user's go-ahead.

Task List Maintenance

Update the task list as you work:

Mark tasks and subtasks as completed ([x]) per the protocol above.
Add new tasks as they emerge, referencing the correct PRD section.


Maintain the "Relevant Files" section:

List every file created or modified.
Give each file a one-line description of its purpose (component, hook, service, test, etc.).
For React, include component files (*.tsx/*.jsx), hooks (*.ts), tests (*.test.tsx), styles (*.styles.ts), types (*.types.ts), stories (*.stories.tsx), and documentation.

PRD/Reference Linking

Reference the specific PRD section for each task/sub-task, e.g. [PRD-2.3.2].
Optionally, link to external docs (React docs, design system, API documentation), or issue trackers (GitHub Issues, Jira, Linear).
Use atomic, traceable commits.

React Specific Commit Message Conventions

Use conventional commit types:

feat: - New features, components, or functionality
fix: - Bug fixes
refactor: - Code refactoring without feature changes
test: - Adding or updating tests
docs: - Documentation updates
style: - Code formatting, CSS/styling changes
perf: - Performance improvements
chore: - Build process, dependencies, tooling


Reference PRD sections and close issues/tickets.
Prefer atomic commits and clear, single-purpose changes for easier review and traceability.

React Development Quality Gates
Before marking any parent task as complete, ensure:
Code Quality

 TypeScript compilation passes without errors
 ESLint passes with no errors (warnings acceptable if documented)
 Prettier formatting applied
 No console.log or debug code left in production builds
 Proper error boundaries implemented where needed

Testing Requirements

 Unit tests written with React Testing Library
 Test coverage ≥ 80% for new components/functions
 Integration tests for complex user flows
 Accessibility tests pass (axe-core)
 Visual regression tests (if using Chromatic/Storybook)

Performance & Bundle

 Bundle size impact analyzed (npm run build -- --stats)
 No unnecessary re-renders (React DevTools Profiler)
 Code splitting implemented for large components
 Images optimized and lazy-loaded where appropriate

Accessibility (WCAG 2.1 AA)

 Proper ARIA labels and roles
 Keyboard navigation functional
 Screen reader compatibility tested
 Color contrast ratios meet standards
 Focus management implemented

Browser Compatibility

 Tested in target browsers (Chrome, Firefox, Safari, Edge)
 Mobile responsive design verified
 Cross-browser CSS compatibility checked

AI Instructions
When working with React task lists, the AI must:

Regularly update the task list file after finishing any significant work.
Follow the completion protocol strictly:

Mark each finished sub-task [x].
Mark the parent task [x] once all its subtasks are [x].


Add newly discovered tasks referencing PRD sections.
Keep "Relevant Files" accurate and up to date.
Before starting work, check which sub-task is next.
After implementing a sub-task, update the file and then pause for user approval.
The solution must follow React development best practices:

Functional components with hooks over class components
Proper TypeScript typing for all props and state
Single responsibility principle for components
Consistent file and folder naming conventions
Proper error handling and loading states


Ensure accessibility and performance standards are met.
Follow the project's established patterns for state management (Redux, Zustand, Context API).

Example Template
markdown# PRD Task List: React User Profile Feature

*Generated from: `prd-user-profile-component.md`*

## Tasks

- [ ] Implement UserProfile Component [PRD-2.3]
    - [ ] Create component structure and TypeScript interfaces [PRD-2.3.1]
    - [ ] Implement state management with React hooks [PRD-2.3.2]
    - [ ] Add form validation and error handling [PRD-2.3.3]
    - [ ] Implement responsive design with styled-components [PRD-2.3.4]
    - [ ] Add accessibility features (ARIA labels, keyboard nav) [PRD-2.3.5]

- [ ] Integrate with User API Service [PRD-4.1]
    - [ ] Create custom hook for user data fetching [PRD-4.1.1]
    - [ ] Implement optimistic updates for profile changes [PRD-4.1.2]
    - [ ] Add error handling and retry logic [PRD-4.1.3]

- [ ] Testing Implementation [PRD-5.2]
    - [ ] Write unit tests with React Testing Library [PRD-5.2.1]
    - [ ] Create integration tests for user flows [PRD-5.2.2]
    - [ ] Add Storybook stories for component variants [PRD-5.2.3]
    - [ ] Implement accessibility tests with axe [PRD-5.2.4]

## Relevant Files

### Component Files
- `src/components/UserProfile/UserProfile.tsx` — Main UserProfile component implementation
- `src/components/UserProfile/UserProfile.types.ts` — TypeScript interfaces and prop definitions
- `src/components/UserProfile/UserProfile.styles.ts` — Styled-components styling
- `src/components/UserProfile/index.ts` — Barrel export for clean imports

### Hook Files
- `src/hooks/useUserProfile.ts` — Custom hook for user profile data management
- `src/hooks/useUserProfile.test.ts` — Unit tests for the custom hook

### Service Files
- `src/services/userApi.ts` — API service functions for user operations
- `src/services/userApi.test.ts` — Unit tests for API service

### Test Files
- `src/components/UserProfile/UserProfile.test.tsx` — Component unit tests
- `src/components/UserProfile/UserProfile.integration.test.tsx` — Integration tests
- `src/components/UserProfile/__mocks__/UserProfile.mock.ts` — Mock data and functions

### Story Files
- `src/components/UserProfile/UserProfile.stories.tsx` — Storybook stories

### Documentation
- `docs/components/UserProfile.md` — Component API documentation
- `README.md` — Updated with new component information

## Reference Links

- PRD Document: [User Profile Component PRD](./prd-user-profile-component.md)
- GitHub Issue: [User Profile Implementation #123](https://github.com/project/repo/issues/123)
- Design System: [Profile Component Specs](https://design.company.com/components/profile)
- React Documentation: [Hooks API Reference](https://react.dev/reference/react)
- Accessibility Guide: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Quality Checklist

### Code Quality ✅
- [x] TypeScript compilation passes
- [x] ESLint passes with no errors
- [x] Prettier formatting applied
- [x] No debug code in production

### Testing ✅  
- [x] Unit tests written (95% coverage)
- [x] Integration tests implemented
- [x] Accessibility tests pass
- [x] Storybook stories created

### Performance ✅
- [x] Bundle size analyzed (+2.3kb gzipped)
- [x] No unnecessary re-renders
- [x] Images optimized and lazy-loaded

### Accessibility ✅
- [x] ARIA labels implemented
- [x] Keyboard navigation works
- [x] Screen reader tested
- [x] Color contrast verified (AA compliant)

## Notes

- Component follows the established design system patterns
- State management uses React Context for global user data
- Form validation implemented with react-hook-form and zod
- Responsive breakpoints: mobile (320px), tablet (768px), desktop (1024px)
- Error boundaries implemented at feature level
- Loading states and skeleton screens included
- Optimistic updates for better UX

Command Reference
# Development Commands
bashnpm start                    # Start development server
npm test                     # Run unit tests
npm run test:coverage        # Generate test coverage report  
npm run test:watch           # Run tests in watch mode
npm run type-check          # TypeScript compilation check
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint errors automatically
npm run build               # Create production build
npm run preview             # Preview production build locally

# Storybook Commands
bashnpm run storybook           # Start Storybook development server
npm run build-storybook     # Build Storybook for deployment
npm run test-storybook      # Run visual regression tests

# Quality Assurance Commands
bashnpm run test:a11y           # Run accessibility tests
npm run test:e2e            # Run end-to-end tests
npm run analyze-bundle      # Analyze bundle size
npm run lighthouse          # Run Lighthouse audit


