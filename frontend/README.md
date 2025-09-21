# SoleMate Frontend

A modern, accessible e-commerce frontend built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with TailwindCSS
- ♿ **Accessibility First** - WCAG 2.1 AA compliant components
- 🛍️ **Product Catalog** - Advanced filtering, search, and product details
- 🛒 **Shopping Cart** - Persistent cart with guest and authenticated support
- 💳 **Checkout Flow** - Seamless PayPal integration
- 👤 **User Management** - Registration, login, and profile management
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance** - Optimized with Next.js SSR/ISR
- 🔍 **SEO Optimized** - Meta tags, structured data, and sitemap
- 🧪 **Testing** - Comprehensive test suite with Jest and Playwright

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **State Management**: React Context + React Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library, Playwright
- **Accessibility**: axe-core for automated testing

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `env.example` to `.env.local` and configure:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id

# Application Configuration
NEXT_PUBLIC_APP_NAME=SoleMate
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # User dashboard
│   ├── admin/             # Admin pages
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── accessibility/     # Accessibility utilities
│   ├── home/              # Home page components
│   ├── layout/            # Layout components
│   ├── products/          # Product-related components
│   └── providers/         # Context providers
├── lib/                   # Utility libraries
│   └── api.ts            # API client
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## Available Scripts

```bash
# Development
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
npm run test:a11y          # Run accessibility tests
```

## Accessibility Features

### WCAG 2.1 AA Compliance

- **Semantic HTML** - Proper heading structure and landmarks
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and descriptions
- **Color Contrast** - Meets 4.5:1 ratio requirements
- **Focus Management** - Visible focus indicators
- **Form Accessibility** - Proper labels and error handling

### Testing

```bash
# Run accessibility tests
npm run test:a11y

# Run all tests including accessibility
npm test
```

## Component Guidelines

### Creating Accessible Components

1. **Use semantic HTML** elements
2. **Add ARIA attributes** where needed
3. **Ensure keyboard navigation** works
4. **Provide focus management** for modals/drawers
5. **Include proper labels** for form inputs
6. **Test with screen readers**

### Example Component

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export function Button({ children, onClick, disabled, ariaLabel }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="btn-primary"
    >
      {children}
    </button>
  );
}
```

## State Management

### React Context

- **AuthProvider** - User authentication state
- **CartProvider** - Shopping cart state
- **ThemeProvider** - Theme and preferences

### React Query

- **Server state management** - API data caching
- **Background updates** - Automatic data refresh
- **Optimistic updates** - Immediate UI feedback

## API Integration

The frontend communicates with the backend API through:

- **Axios client** with interceptors
- **Automatic token refresh** handling
- **Error boundary** components
- **Loading states** and error handling

## Performance Optimization

- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Static generation** for product pages
- **Service worker** for offline support
- **Bundle analysis** and optimization

## Testing Strategy

### Unit Tests
- Component rendering and behavior
- Hook functionality
- Utility functions
- Accessibility attributes

### Integration Tests
- User workflows
- API integration
- Form submissions
- Navigation

### E2E Tests
- Complete user journeys
- Cross-browser testing
- Accessibility compliance
- Performance metrics

## Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main

### Docker

```bash
# Build production image
docker build -t solemate-frontend .

# Run container
docker run -p 3000:3000 solemate-frontend
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.solemate.com
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-production-paypal-id
NEXT_PUBLIC_APP_URL=https://solemate.com
```

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Follow accessibility guidelines**
4. **Add tests for new features**
5. **Ensure all tests pass**
6. **Submit a pull request**

### Accessibility Checklist

- [ ] Semantic HTML structure
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Form labels and error messages
- [ ] ARIA attributes where needed
- [ ] Automated accessibility tests pass

## License

MIT License - see LICENSE file for details.

## Support

For questions or support:
- Check the component documentation
- Review accessibility guidelines
- Open an issue in the repository
