# PRD: Cart & Order APIs (BE-2.3)

## Component/Feature Overview

**Component Name**: Cart & Order Management APIs  
**Problem Solved**: Provides comprehensive cart management and order processing functionality for the SoleMate e-commerce platform  
**Main Goal**: Implement cart synchronization, order creation, and PayPal integration with proper state management and error handling  
**Component Hierarchy**: `/src/modules/cart/` and `/src/modules/orders/` - Cart and order management modules

## Technical Specifications

**Component Type**: NestJS Modules with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Payment Integration**: PayPal REST SDK  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `paypal-rest-sdk` for PayPal integration
- `prisma` for database operations

## User Stories

**US-1**: As a user, I want to add items to my cart so I can collect products for purchase  
**US-2**: As a user, I want to update cart item quantities so I can adjust my order  
**US-3**: As a user, I want to remove items from my cart so I can change my mind  
**US-4**: As a user, I want my cart to sync between devices so I can access it anywhere  
**US-5**: As a user, I want to create orders from my cart so I can complete my purchase  
**US-6**: As a user, I want to pay securely with PayPal so my payment is processed safely

## Functional Requirements

### FR-1: Cart Management
- **FR-1.1**: Create cart retrieval endpoint `GET /api/cart`
- **FR-1.2**: Create add item endpoint `POST /api/cart/items`
- **FR-1.3**: Create update item endpoint `PUT /api/cart/items/:id`
- **FR-1.4**: Create remove item endpoint `DELETE /api/cart/items/:id`
- **FR-1.5**: Create clear cart endpoint `DELETE /api/cart`
- **FR-1.6**: Implement cart synchronization for authenticated users

### FR-2: Cart Validation
- **FR-2.1**: Validate product variant availability
- **FR-2.2**: Check inventory levels before adding items
- **FR-2.3**: Validate quantity limits and constraints
- **FR-2.4**: Handle out-of-stock scenarios gracefully
- **FR-2.5**: Implement cart expiration for guest users
- **FR-2.6**: Validate cart items before checkout

### FR-3: Order Creation
- **FR-3.1**: Create order creation endpoint `POST /api/orders`
- **FR-3.2**: Validate cart contents before order creation
- **FR-3.3**: Calculate order totals including tax and shipping
- **FR-3.4**: Reserve inventory for order items
- **FR-3.5**: Generate unique order numbers
- **FR-3.6**: Handle order creation errors and rollback

### FR-4: PayPal Integration
- **FR-4.1**: Create PayPal order endpoint `POST /api/checkout/paypal`
- **FR-4.2**: Implement PayPal order creation and approval
- **FR-4.3**: Handle PayPal payment capture
- **FR-4.4**: Process PayPal webhook notifications
- **FR-4.5**: Validate PayPal payment signatures
- **FR-4.6**: Handle PayPal payment failures and retries

### FR-5: Order Management
- **FR-5.1**: Create order retrieval endpoint `GET /api/orders/:id`
- **FR-5.2**: Create order list endpoint `GET /api/orders`
- **FR-5.3**: Implement order status tracking
- **FR-5.4**: Handle order state transitions
- **FR-5.5**: Implement order cancellation
- **FR-5.6**: Add order history for users

### FR-6: Inventory Management
- **FR-6.1**: Decrement inventory on order completion
- **FR-6.2**: Restore inventory on order cancellation
- **FR-6.3**: Track inventory changes with audit logs
- **FR-6.4**: Handle inventory conflicts and race conditions
- **FR-6.5**: Implement low stock alerts
- **FR-6.6**: Support inventory reservations

## Component API Design

### Controller Endpoints
```typescript
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  @Get()
  async getCart(@Request() req): Promise<CartResponse>

  @Post('items')
  async addItem(@Request() req, @Body() addItemDto: AddCartItemDto): Promise<CartResponse>

  @Put('items/:id')
  async updateItem(@Request() req, @Param('id') id: string, @Body() updateItemDto: UpdateCartItemDto): Promise<CartResponse>

  @Delete('items/:id')
  async removeItem(@Request() req, @Param('id') id: string): Promise<CartResponse>

  @Delete()
  async clearCart(@Request() req): Promise<CartResponse>
}

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  @Get()
  async getOrders(@Request() req): Promise<OrdersResponse>

  @Get(':id')
  async getOrder(@Request() req, @Param('id') id: string): Promise<OrderResponse>

  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<OrderResponse>
}

@Controller('checkout')
@UseGuards(JwtAuthGuard)
export class CheckoutController {
  @Post('paypal')
  async createPayPalOrder(@Request() req, @Body() checkoutDto: CheckoutDto): Promise<PayPalOrderResponse>

  @Post('paypal/capture')
  async capturePayPalOrder(@Body() captureDto: CapturePayPalDto): Promise<OrderResponse>
}
```

### DTOs
```typescript
export class AddCartItemDto {
  @IsString()
  @IsNotEmpty()
  productVariantId: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  quantity: number = 1;
}

export class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  quantity: number;
}

export class CreateOrderDto {
  @IsObject()
  shippingAddress: AddressDto;

  @IsObject()
  billingAddress: AddressDto;

  @IsString()
  @IsNotEmpty()
  shippingMethod: string;

  @IsOptional()
  @IsString()
  promoCode?: string;
}

export class CheckoutDto {
  @IsObject()
  shippingAddress: AddressDto;

  @IsObject()
  billingAddress: AddressDto;

  @IsString()
  @IsNotEmpty()
  shippingMethod: string;

  @IsOptional()
  @IsString()
  promoCode?: string;
}
```

### Response Types
```typescript
interface CartResponse {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

interface OrderResponse {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentInfo: PaymentInfo;
  createdAt: string;
  updatedAt: string;
}

interface PayPalOrderResponse {
  orderId: string;
  approvalUrl: string;
  status: string;
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Loading States**: Support for client-side loading indicators
- **Validation**: Comprehensive input validation and error messages

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for frequently accessed data
- **Transaction Management**: Proper database transaction handling
- **Error Recovery**: Graceful error handling and recovery

## Integration Requirements

### Database Integration
- **Cart Entity**: Integrate with Prisma CartItem model
- **Order Entity**: Integrate with Prisma Order model
- **Product Entity**: Integrate with Prisma Product model
- **User Entity**: Integrate with Prisma User model

### External Dependencies
- **PayPal SDK**: Use PayPal REST SDK for payment processing
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation
- **Logging**: Implement comprehensive logging for debugging

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **State Management**: Support for frontend state management
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Multiple payment methods (only PayPal)
- Advanced inventory management
- Order modification after payment
- Complex shipping calculations
- International shipping
- Advanced order analytics

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all cart and order service methods
- **Validation**: Test input validation rules
- **PayPal Integration**: Test PayPal integration logic
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all cart and order endpoints
- **Database Integration**: Test cart and order creation
- **PayPal Integration**: Test PayPal payment processing
- **Order Flow**: Test complete order creation flow

### E2E Testing
- **Complete Flow**: Test complete cart to order flow
- **PayPal Integration**: Test PayPal payment processing
- **Error Scenarios**: Test error handling and recovery
- **Performance**: Test performance under load

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Transaction Management**: Efficient database transaction handling
- **Caching**: Implement caching for cart and order data
- **PayPal Integration**: Optimize PayPal API calls
- **Error Handling**: Efficient error handling and recovery

## Success Metrics

- **Performance**: Cart operations under 200ms
- **Reliability**: 99.9% uptime for cart and order endpoints
- **Code Quality**: 90%+ test coverage
- **Payment Success**: 95%+ PayPal payment success rate
- **Order Accuracy**: 100% order accuracy

## Implementation Notes

### File Structure
```
src/modules/cart/
├── cart.module.ts             # Cart module
├── cart.controller.ts         # Cart controller
├── cart.service.ts            # Cart service
├── dto/
│   ├── add-cart-item.dto.ts   # Add cart item DTO
│   └── update-cart-item.dto.ts # Update cart item DTO
└── cart.module.spec.ts        # Unit tests

src/modules/orders/
├── orders.module.ts           # Orders module
├── orders.controller.ts       # Orders controller
├── orders.service.ts          # Orders service
├── dto/
│   ├── create-order.dto.ts    # Create order DTO
│   └── checkout.dto.ts        # Checkout DTO
└── orders.module.spec.ts      # Unit tests

src/modules/checkout/
├── checkout.module.ts         # Checkout module
├── checkout.controller.ts     # Checkout controller
├── checkout.service.ts        # Checkout service
├── paypal.service.ts          # PayPal service
└── checkout.module.spec.ts    # Unit tests
```

### Database Schema
```prisma
model CartItem {
  id                String   @id @default(cuid())
  userId            String
  productVariantId  String
  quantity          Int      @default(1)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user           User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  productVariant ProductVariant @relation(fields: [productVariantId], references: [id], onDelete: Cascade)

  @@unique([userId, productVariantId])
  @@map("cart_items")
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  orderNumber     String      @unique
  totalAmount     Decimal     @db.Decimal(10, 2)
  status          OrderStatus @default(CREATED)
  paymentProvider String
  paymentRef      String?
  shippingAddress Json
  billingAddress  Json
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user  User        @relation(fields: [userId], references: [id])
  items OrderItem[]

  @@map("orders")
}

model OrderItem {
  id                String   @id @default(cuid())
  orderId           String
  productVariantId  String
  quantity          Int
  unitPrice         Decimal  @db.Decimal(10, 2)
  createdAt         DateTime @default(now())

  order          Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productVariant ProductVariant @relation(fields: [productVariantId], references: [id])

  @@map("order_items")
}

enum OrderStatus {
  CREATED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}
```

### PayPal Integration
```typescript
@Injectable()
export class PayPalService {
  constructor(private readonly configService: ConfigService) {
    paypal.configure({
      mode: this.configService.get('PAYPAL_MODE'),
      client_id: this.configService.get('PAYPAL_CLIENT_ID'),
      client_secret: this.configService.get('PAYPAL_CLIENT_SECRET'),
    });
  }

  async createOrder(orderData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      paypal.payment.create(orderData, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }

  async executePayment(paymentId: string, payerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }
}
```

## Open Questions

1. **Cart Expiration**: How long should guest carts persist?
2. **Inventory Management**: Should we implement inventory reservations?
3. **Order Modification**: Should users be able to modify orders after creation?
4. **Payment Retry**: How many times should we retry failed payments?
5. **Analytics**: What cart and order metrics should we track?

## Acceptance Criteria

- [ ] Cart management endpoints work correctly
- [ ] Order creation works with proper validation
- [ ] PayPal integration works correctly
- [ ] Cart synchronization works for authenticated users
- [ ] Inventory management works correctly
- [ ] Order status tracking works
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all cart and order operations
- [ ] Performance meets specified benchmarks
- [ ] Payment processing is secure and reliable
