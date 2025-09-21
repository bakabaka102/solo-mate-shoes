# PRD: Cart Drawer & Cart Page (FE-2.3)

## Component/Feature Overview

**Component Name**: CartDrawer & CartPage  
**Problem Solved**: Provides accessible shopping cart functionality for users to manage their selected items before checkout  
**Main Goal**: Display cart items with quantity management, item removal, and persistent storage while maintaining WCAG 2.1 AA accessibility compliance  
**Component Hierarchy**: `/components/layout/CartDrawer.tsx` and `/app/cart/page.tsx` - Cart management components

## Technical Specifications

**Component Type**: React Components with Context Integration  
**Framework**: Next.js 14 with App Router  
**Styling**: TailwindCSS with custom design system  
**State Management**: Cart Context + React Query for server state  
**Required Dependencies**: 
- `@tanstack/react-query` for server state management
- `axios` for API calls
- `lucide-react` for icons
- `next/image` for image optimization
- `js-cookie` for localStorage management

## User Stories

**US-1**: As a shopper, I want to view my cart items so I can see what I've selected  
**US-2**: As a shopper, I want to update item quantities so I can adjust my order  
**US-3**: As a shopper, I want to remove items from my cart so I can change my mind  
**US-4**: As a shopper with disabilities, I want to manage my cart using only my keyboard so I can complete my purchase  
**US-5**: As a guest user, I want my cart to persist in localStorage so I don't lose my selections  
**US-6**: As a logged-in user, I want my cart to sync with the server so I can access it from any device

## Functional Requirements

### FR-1: Cart Display
- **FR-1.1**: Display cart items with product images, titles, and prices
- **FR-1.2**: Show item quantities with accessible controls
- **FR-1.3**: Display subtotal, tax, and total calculations
- **FR-1.4**: Show cart item count in header
- **FR-1.5**: Handle empty cart state with helpful messaging
- **FR-1.6**: Display loading states during cart operations

### FR-2: Quantity Management
- **FR-2.1**: Implement accessible quantity increment/decrement buttons
- **FR-2.2**: Support direct quantity input with validation
- **FR-2.3**: Enforce minimum quantity of 1
- **FR-2.4**: Handle maximum quantity based on inventory
- **FR-2.5**: Update cart totals in real-time
- **FR-2.6**: Provide clear feedback for quantity changes

### FR-3: Item Removal
- **FR-3.1**: Implement accessible remove item functionality
- **FR-3.2**: Provide confirmation for item removal
- **FR-3.3**: Update cart totals after item removal
- **FR-3.4**: Handle removal errors gracefully
- **FR-3.5**: Provide undo functionality for accidental removal
- **FR-3.6**: Update cart count in header

### FR-4: Cart Persistence
- **FR-4.1**: Store guest cart in localStorage
- **FR-4.2**: Sync guest cart to server on login
- **FR-4.3**: Load user cart from server on authentication
- **FR-4.4**: Handle cart merge conflicts
- **FR-4.5**: Implement cart expiration for guest users
- **FR-4.6**: Provide cart backup and recovery

### FR-5: Cart Drawer
- **FR-5.1**: Implement slide-out cart drawer from header
- **FR-5.2**: Support keyboard navigation and focus management
- **FR-5.3**: Handle escape key to close drawer
- **FR-5.4**: Prevent body scroll when drawer is open
- **FR-5.5**: Implement backdrop click to close
- **FR-5.6**: Support screen reader announcements

### FR-6: Cart Page
- **FR-6.1**: Create dedicated cart page for detailed cart management
- **FR-6.2**: Display all cart items with full product information
- **FR-6.3**: Implement cart item editing and management
- **FR-6.4**: Show shipping and tax calculations
- **FR-6.5**: Provide checkout button and continue shopping link
- **FR-6.6**: Support cart sharing and saving

### FR-7: Accessibility Features
- **FR-7.1**: Implement proper ARIA labels for all interactive elements
- **FR-7.2**: Ensure keyboard navigation works throughout cart
- **FR-7.3**: Provide focus management for drawer and modal
- **FR-7.4**: Support screen reader announcements for cart changes
- **FR-7.5**: Use semantic HTML structure with proper headings
- **FR-7.6**: Implement skip links for main content

## Component API Design

### Cart Context Interface
```typescript
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (productVariantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
}
```

### Cart Item Interface
```typescript
interface CartItem {
  id: string;
  productVariantId: string;
  product: {
    id: string;
    title: string;
    slug: string;
    images: string[];
  };
  variant: {
    id: string;
    size: string;
    color: string;
    price: number;
  };
  quantity: number;
}
```

### Cart Drawer Props
```typescript
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
```

## UI/UX Requirements

### Visual Design
- **Design System**: Follow SoleMate brand colors and typography
- **Layout**: Clean, organized cart layout with clear hierarchy
- **Cart Drawer**: Slide-out drawer with smooth animations
- **Cart Page**: Full-page layout with comprehensive cart management
- **Loading States**: Skeleton screens and loading indicators
- **Empty States**: Helpful messaging and call-to-action buttons

### Responsive Behavior
- **Mobile**: Full-screen cart drawer with touch-friendly controls
- **Tablet**: Slide-out drawer with moderate width
- **Desktop**: Slide-out drawer with full functionality
- **Touch Targets**: Minimum 44px touch targets for mobile

### Accessibility Compliance
- **WCAG 2.1 AA**: Full compliance required
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Screen Reader**: Proper semantic HTML and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility

## Integration Requirements

### Parent Component Integration
- **Header**: Integrate cart drawer with header cart button
- **Layout**: Inherit from root layout with header/footer
- **Router**: Use Next.js router for navigation

### Global State Management
- **Cart Context**: Integrate with cart context for state management
- **Auth Context**: Handle different cart behavior for authenticated users
- **Product Context**: Access product data for cart items

### API Integration
- **Endpoints**: 
  - `GET /api/cart` - Get user cart
  - `POST /api/cart/items` - Add item to cart
  - `PUT /api/cart/items/:id` - Update cart item
  - `DELETE /api/cart/items/:id` - Remove cart item
- **Error Handling**: Display appropriate error messages
- **Loading States**: Show loading indicators during API calls

## Non-Goals (Out of Scope)

- Cart sharing functionality
- Cart saving for later
- Cart comparison features
- Advanced cart analytics
- Cart abandonment recovery
- Multi-cart support

## Testing Requirements

### Unit Testing
- **Component Rendering**: Test cart components render correctly
- **Cart Operations**: Test add, update, remove functionality
- **State Management**: Test cart context state updates
- **Accessibility**: Test ARIA attributes and keyboard navigation
- **Local Storage**: Test localStorage cart persistence

### Integration Testing
- **API Integration**: Test cart operations with real API
- **Auth Integration**: Test cart behavior for authenticated users
- **Cart Sync**: Test cart synchronization between client and server
- **Error Handling**: Test error scenarios and recovery

### E2E Testing
- **Complete Flow**: Test complete cart management experience
- **Accessibility**: Test with screen reader and keyboard only
- **Mobile**: Test responsive behavior on mobile devices
- **Performance**: Test cart operations performance

## Performance Considerations

- **Local Storage**: Efficient localStorage operations
- **API Calls**: Minimize redundant API calls
- **State Updates**: Optimize cart state updates
- **Image Loading**: Lazy load product images in cart
- **Bundle Size**: Minimize JavaScript bundle size

## Success Metrics

- **Accessibility Score**: 100% WCAG 2.1 AA compliance
- **Performance**: Cart operations under 500ms
- **User Experience**: Smooth cart management experience
- **Code Quality**: 90%+ test coverage
- **Cart Persistence**: 100% cart data persistence

## Implementation Notes

### File Structure
```
src/components/layout/
├── CartDrawer.tsx            # Cart drawer component
└── CartDrawer.test.tsx       # Unit tests
src/app/cart/
├── page.tsx                  # Cart page component
└── components/
    ├── CartItem.tsx          # Individual cart item
    ├── CartSummary.tsx       # Cart totals and summary
    ├── CartEmpty.tsx         # Empty cart state
    └── CartActions.tsx       # Cart action buttons
src/contexts/
└── CartContext.tsx           # Cart context provider
```

### Cart Drawer Implementation
```typescript
const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* Drawer content */}
      </div>
    </>
  );
};
```

### Cart Persistence Implementation
```typescript
// Local storage cart management
const saveGuestCart = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem('guest-cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save guest cart:', error);
  }
};

const loadGuestCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('guest-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Failed to load guest cart:', error);
    return [];
  }
};
```

## Open Questions

1. **Cart Expiration**: How long should guest carts persist in localStorage?
2. **Cart Limits**: Should we implement maximum cart item limits?
3. **Cart Sharing**: Should we implement cart sharing functionality?
4. **Cart Analytics**: What cart events should we track for analytics?
5. **Cart Recovery**: Should we implement cart abandonment recovery?

## Acceptance Criteria

- [ ] Cart drawer opens and closes with proper accessibility
- [ ] Cart items display correctly with all required information
- [ ] Quantity management works with proper validation
- [ ] Item removal works with confirmation
- [ ] Cart persistence works for both guest and authenticated users
- [ ] Cart page provides comprehensive cart management
- [ ] Accessibility requirements are met (WCAG 2.1 AA)
- [ ] Responsive design works on all device sizes
- [ ] Unit tests achieve 90%+ coverage
- [ ] E2E tests pass for complete cart management experience
- [ ] Performance meets specified benchmarks
- [ ] Cart synchronization works correctly
