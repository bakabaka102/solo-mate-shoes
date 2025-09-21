# PRD: Promotions UI (FE-3.2)

## Component/Feature Overview

**Component Name**: Promotions UI Components  
**Problem Solved**: Provides promotional code input and display functionality to help users apply discounts and special offers  
**Main Goal**: Implement accessible promotional code input with validation, display promotional offers, and maintain WCAG 2.1 AA accessibility compliance  
**Component Hierarchy**: `/components/promotions/` - Promotion-related UI components

## Technical Specifications

**Component Type**: React Functional Components with Hooks  
**Framework**: Next.js 14 with App Router  
**Styling**: TailwindCSS with custom design system  
**State Management**: React Query for server state + local state for forms  
**Required Dependencies**: 
- `@tanstack/react-query` for server state management
- `react-hook-form` for form handling
- `@hookform/resolvers/zod` for validation
- `zod` for schema validation
- `axios` for API calls
- `lucide-react` for icons

## User Stories

**US-1**: As a shopper, I want to enter promotional codes so I can get discounts on my purchase  
**US-2**: As a shopper, I want to see available promotions so I can take advantage of special offers  
**US-3**: As a shopper with disabilities, I want to use promotional codes with keyboard navigation so I can access all features  
**US-4**: As a shopper, I want to see clear feedback when I apply a promotional code so I know if it worked  
**US-5**: As a shopper, I want to see the discount amount clearly so I know how much I'm saving  
**US-6**: As a shopper, I want to remove promotional codes if I change my mind so I have flexibility

## Functional Requirements

### FR-1: Promotional Code Input
- **FR-1.1**: Create accessible promotional code input field
- **FR-1.2**: Implement real-time validation for promotional codes
- **FR-1.3**: Show inline error messages for invalid codes
- **FR-1.4**: Display success feedback for valid codes
- **FR-1.5**: Support keyboard navigation and accessibility
- **FR-1.6**: Handle promotional code submission and validation

### FR-2: Promotional Code Display
- **FR-2.1**: Display applied promotional codes with discount details
- **FR-2.2**: Show promotional code expiration dates
- **FR-2.3**: Display promotional code terms and conditions
- **FR-2.4**: Show promotional code usage limits
- **FR-2.5**: Display promotional code restrictions
- **FR-2.6**: Support promotional code removal functionality

### FR-3: Promotional Offers Display
- **FR-3.1**: Display available promotional offers
- **FR-3.2**: Show promotional offer details and requirements
- **FR-3.3**: Display promotional offer expiration dates
- **FR-3.4**: Show promotional offer usage instructions
- **FR-3.5**: Display promotional offer eligibility requirements
- **FR-3.6**: Support promotional offer filtering and sorting

### FR-4: Discount Calculation Display
- **FR-4.1**: Display discount amount clearly
- **FR-4.2**: Show discount percentage or fixed amount
- **FR-4.3**: Display total savings from promotional codes
- **FR-4.4**: Show updated order totals after discount application
- **FR-4.5**: Display discount breakdown in order summary
- **FR-4.6**: Support multiple promotional code combinations

### FR-5: Promotional Code Validation
- **FR-5.1**: Validate promotional code format and structure
- **FR-5.2**: Check promotional code expiration dates
- **FR-5.3**: Validate promotional code usage limits
- **FR-5.4**: Check promotional code eligibility requirements
- **FR-5.5**: Validate promotional code restrictions
- **FR-5.6**: Handle promotional code conflicts and overlaps

### FR-6: Accessibility Features
- **FR-6.1**: Implement proper ARIA labels for all interactive elements
- **FR-6.2**: Ensure keyboard navigation works throughout promotions
- **FR-6.3**: Provide focus management for promotional code input
- **FR-6.4**: Support screen reader announcements for promotional updates
- **FR-6.5**: Use semantic HTML structure with proper headings
- **FR-6.6**: Implement skip links for promotional sections

## Component API Design

### Props Interface
```typescript
interface PromoCodeInputProps {
  onApplyCode: (code: string) => Promise<void>;
  onRemoveCode: (code: string) => void;
  appliedCodes: AppliedPromoCode[];
  isLoading?: boolean;
  disabled?: boolean;
}

interface PromoOffersDisplayProps {
  offers: PromoOffer[];
  onSelectOffer: (offer: PromoOffer) => void;
  selectedOffers: PromoOffer[];
}

interface DiscountDisplayProps {
  discounts: AppliedDiscount[];
  totalDiscount: number;
  originalTotal: number;
  finalTotal: number;
}
```

### Promotional Code Data Structure
```typescript
interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  expirationDate: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  restrictions: PromoCodeRestriction[];
}

interface AppliedPromoCode {
  id: string;
  code: string;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
  appliedAt: string;
  expiresAt: string;
}

interface PromoOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  expirationDate: string;
  isActive: boolean;
  terms: string;
}
```

### Form Schema
```typescript
const promoCodeSchema = z.object({
  code: z.string()
    .min(1, 'Promotional code is required')
    .max(20, 'Promotional code must be less than 20 characters')
    .regex(/^[A-Z0-9-]+$/, 'Promotional code can only contain uppercase letters, numbers, and hyphens'),
});
```

## UI/UX Requirements

### Visual Design
- **Design System**: Follow SoleMate brand colors and typography
- **Layout**: Clean, organized promotional code layout
- **Input Field**: Clear, accessible promotional code input
- **Success States**: Green success indicators for applied codes
- **Error States**: Red error indicators for invalid codes
- **Loading States**: Loading indicators during code validation

### Responsive Behavior
- **Mobile**: Full-width input with touch-friendly controls
- **Tablet**: Responsive layout with appropriate spacing
- **Desktop**: Full layout with sidebar promotional offers
- **Touch Targets**: Minimum 44px touch targets for mobile

### Accessibility Compliance
- **WCAG 2.1 AA**: Full compliance required
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Screen Reader**: Proper semantic HTML and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility

## Integration Requirements

### Parent Component Integration
- **Checkout Page**: Integrate with checkout page for discount application
- **Cart Page**: Integrate with cart page for promotional code management
- **Product Pages**: Display promotional offers on product pages

### Global State Management
- **Cart Context**: Integrate with cart context for discount application
- **Promo Context**: Manage promotional code state across components
- **Order Context**: Update order totals with applied discounts

### API Integration
- **Endpoints**: 
  - `POST /api/promotions/validate` - Validate promotional code
  - `GET /api/promotions/offers` - Get available promotional offers
  - `POST /api/promotions/apply` - Apply promotional code
  - `DELETE /api/promotions/remove` - Remove promotional code
- **Error Handling**: Display appropriate error messages
- **Loading States**: Show loading indicators during API calls

## Non-Goals (Out of Scope)

- Advanced promotional code analytics
- Promotional code generation
- Complex promotional code rules
- Promotional code expiration notifications
- Promotional code sharing functionality
- Advanced promotional code management

## Testing Requirements

### Unit Testing
- **Component Rendering**: Test promotional code components render correctly
- **Form Validation**: Test promotional code validation
- **Discount Calculation**: Test discount calculation logic
- **Accessibility**: Test ARIA attributes and keyboard navigation
- **State Management**: Test promotional code state updates

### Integration Testing
- **API Integration**: Test promotional code validation and application
- **Cart Integration**: Test promotional code integration with cart
- **Discount Application**: Test discount application and removal
- **Error Handling**: Test error scenarios and recovery

### E2E Testing
- **Complete Flow**: Test complete promotional code application experience
- **Accessibility**: Test with screen reader and keyboard only
- **Mobile**: Test responsive behavior on mobile devices
- **Performance**: Test promotional code validation performance

## Performance Considerations

- **Code Validation**: Optimize promotional code validation
- **State Updates**: Minimize unnecessary re-renders
- **API Calls**: Debounce promotional code validation
- **Discount Calculation**: Optimize discount calculation logic
- **Bundle Size**: Minimize JavaScript bundle size

## Success Metrics

- **Accessibility Score**: 100% WCAG 2.1 AA compliance
- **Performance**: Promotional code validation under 500ms
- **User Experience**: Clear promotional code application process
- **Code Quality**: 90%+ test coverage
- **Promotional Code Usage**: High promotional code application rates

## Implementation Notes

### File Structure
```
src/components/promotions/
├── PromoCodeInput.tsx          # Promotional code input component
├── PromoCodeDisplay.tsx        # Applied promotional codes display
├── PromoOffersDisplay.tsx      # Available promotional offers
├── DiscountDisplay.tsx         # Discount calculation display
├── PromoCodeValidation.tsx     # Promotional code validation
└── PromoCodeForm.tsx           # Promotional code form
src/hooks/
├── usePromoCode.ts             # Promotional code logic
├── usePromoValidation.ts       # Promotional code validation
└── useDiscountCalculation.ts   # Discount calculation logic
src/types/
└── promotion.types.ts          # TypeScript interfaces
```

### Promotional Code Input Implementation
```typescript
const PromoCodeInput = ({ onApplyCode, onRemoveCode, appliedCodes, isLoading, disabled }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsValidating(true);
    setError('');

    try {
      await onApplyCode(code.trim().toUpperCase());
      setCode('');
    } catch (err) {
      setError(err.message || 'Invalid promotional code');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1">
          <label htmlFor="promo-code" className="sr-only">
            Promotional Code
          </label>
          <input
            id="promo-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter promotional code"
            disabled={disabled || isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-describedby={error ? 'promo-code-error' : undefined}
          />
          {error && (
            <p id="promo-code-error" className="mt-1 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || isLoading || !code.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isValidating ? 'Applying...' : 'Apply'}
        </button>
      </form>

      {appliedCodes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Applied Promotional Codes</h3>
          {appliedCodes.map((appliedCode) => (
            <div
              key={appliedCode.id}
              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md"
            >
              <div>
                <p className="text-sm font-medium text-green-800">
                  {appliedCode.code}
                </p>
                <p className="text-sm text-green-600">
                  {appliedCode.discountType === 'percentage'
                    ? `${appliedCode.discountAmount}% off`
                    : `$${appliedCode.discountAmount} off`}
                </p>
              </div>
              <button
                onClick={() => onRemoveCode(appliedCode.code)}
                className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label={`Remove promotional code ${appliedCode.code}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Discount Display Implementation
```typescript
const DiscountDisplay = ({ discounts, totalDiscount, originalTotal, finalTotal }: DiscountDisplayProps) => {
  if (discounts.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Discounts Applied</h3>
      <div className="space-y-1">
        {discounts.map((discount) => (
          <div key={discount.id} className="flex justify-between text-sm">
            <span className="text-gray-600">{discount.code}</span>
            <span className="text-green-600">-${discount.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${originalTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600">-${totalDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-medium">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
```

## Open Questions

1. **Promotional Code Limits**: Should we limit the number of promotional codes per order?
2. **Promotional Code Stacking**: Should multiple promotional codes be combinable?
3. **Promotional Code Expiration**: Should we show expiration warnings?
4. **Promotional Code Analytics**: What promotional code metrics should we track?
5. **Promotional Code Sharing**: Should users be able to share promotional codes?

## Acceptance Criteria

- [ ] Promotional code input works with proper validation
- [ ] Promotional code display shows applied codes correctly
- [ ] Promotional offers display works with proper filtering
- [ ] Discount calculation display shows accurate amounts
- [ ] Promotional code validation works correctly
- [ ] Accessibility requirements are met (WCAG 2.1 AA)
- [ ] Responsive design works on all device sizes
- [ ] Unit tests achieve 90%+ coverage
- [ ] E2E tests pass for complete promotional code experience
- [ ] Performance meets specified benchmarks
- [ ] Promotional code integration works correctly
