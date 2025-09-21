# PRD: Orders Management (BE-2.4)

## Component/Feature Overview

**Component Name**: Orders Management System  
**Problem Solved**: Provides comprehensive order lifecycle management with status tracking, order history, and administrative controls  
**Main Goal**: Implement complete order management from creation to completion with proper state transitions and user access controls  
**Component Hierarchy**: `/src/modules/orders/` - Order management module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**State Management**: Order status state machine  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `prisma` for database operations
- `xstate` for state machine management (optional)

## User Stories

**US-1**: As a user, I want to view my order history so I can track my purchases  
**US-2**: As a user, I want to see order details so I can understand what I purchased  
**US-3**: As a user, I want to track order status so I know when my order will arrive  
**US-4**: As an admin, I want to manage order status so I can process orders efficiently  
**US-5**: As an admin, I want to view all orders so I can manage the business  
**US-6**: As a system, I want to handle order state transitions so orders are processed correctly

## Functional Requirements

### FR-1: Order Lifecycle Management
- **FR-1.1**: Implement order status state machine (CREATED → PROCESSING → SHIPPED → DELIVERED)
- **FR-1.2**: Handle order cancellation and refund states
- **FR-1.3**: Implement order state transition validation
- **FR-1.4**: Add order state change logging and audit trail
- **FR-1.5**: Handle order state rollback scenarios
- **FR-1.6**: Implement order expiration for unpaid orders

### FR-2: Order Retrieval and Display
- **FR-2.1**: Create user order history endpoint `GET /api/orders`
- **FR-2.2**: Create order detail endpoint `GET /api/orders/:id`
- **FR-2.3**: Implement order filtering and pagination
- **FR-2.4**: Add order search functionality
- **FR-2.5**: Display order items with product details
- **FR-2.6**: Show order status and tracking information

### FR-3: Admin Order Management
- **FR-3.1**: Create admin order list endpoint `GET /api/admin/orders`
- **FR-3.2**: Create admin order detail endpoint `GET /api/admin/orders/:id`
- **FR-3.3**: Implement order status update endpoint `PUT /api/admin/orders/:id/status`
- **FR-3.4**: Add order cancellation endpoint `POST /api/admin/orders/:id/cancel`
- **FR-3.5**: Implement order refund endpoint `POST /api/admin/orders/:id/refund`
- **FR-3.6**: Add order notes and comments functionality

### FR-4: Order Status Tracking
- **FR-4.1**: Implement order status update notifications
- **FR-4.2**: Add order tracking number management
- **FR-4.3**: Create order status history tracking
- **FR-4.4**: Implement order delivery confirmation
- **FR-4.5**: Add order return and exchange handling
- **FR-4.6**: Create order completion workflows

### FR-5: Order Analytics and Reporting
- **FR-5.1**: Implement order statistics and metrics
- **FR-5.2**: Add order revenue tracking
- **FR-5.3**: Create order status distribution reports
- **FR-5.4**: Implement order completion rate tracking
- **FR-5.5**: Add order cancellation analysis
- **FR-5.6**: Create order performance dashboards

### FR-6: Order Integration
- **FR-6.1**: Integrate with payment processing systems
- **FR-6.2**: Connect with shipping and fulfillment systems
- **FR-6.3**: Implement inventory management integration
- **FR-6.4**: Add customer notification systems
- **FR-6.5**: Integrate with accounting systems
- **FR-6.6**: Connect with customer service tools

## Component API Design

### Controller Endpoints
```typescript
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  @Get()
  async getOrders(@Request() req, @Query() query: OrderQueryDto): Promise<OrdersResponse>

  @Get(':id')
  async getOrder(@Request() req, @Param('id') id: string): Promise<OrderResponse>

  @Post(':id/cancel')
  async cancelOrder(@Request() req, @Param('id') id: string): Promise<OrderResponse>
}

@Controller('admin/orders')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminOrdersController {
  @Get()
  async getAllOrders(@Query() query: AdminOrderQueryDto): Promise<AdminOrdersResponse>

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderResponse>

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto): Promise<OrderResponse>

  @Post(':id/cancel')
  async cancelOrder(@Param('id') id: string, @Body() cancelOrderDto: CancelOrderDto): Promise<OrderResponse>

  @Post(':id/refund')
  async refundOrder(@Param('id') id: string, @Body() refundOrderDto: RefundOrderDto): Promise<OrderResponse>
}
```

### DTOs
```typescript
export class OrderQueryDto {
  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;
}

export class CancelOrderDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class RefundOrderDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
```

### Response Types
```typescript
interface OrderResponse {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentInfo: PaymentInfo;
  statusHistory: OrderStatusHistory[];
  trackingInfo?: TrackingInfo;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  orders: OrderResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
}

interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  notes?: string;
  updatedBy: string;
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Pagination**: Proper pagination metadata
- **Status Information**: Clear order status and tracking information

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for frequently accessed order data
- **Pagination**: Efficient pagination for large order lists
- **Status Updates**: Real-time status update notifications

## Integration Requirements

### Database Integration
- **Order Entity**: Integrate with Prisma Order model
- **OrderItem Entity**: Integrate with Prisma OrderItem model
- **User Entity**: Integrate with Prisma User model
- **Product Entity**: Integrate with Prisma Product model

### External Dependencies
- **Payment Systems**: Integrate with payment processing systems
- **Shipping Systems**: Connect with shipping and tracking systems
- **Notification Systems**: Integrate with email and SMS services
- **Analytics**: Connect with analytics and reporting systems

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Status Updates**: Real-time status update support
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Advanced order customization
- Complex order splitting and merging
- Advanced shipping calculations
- International order handling
- Advanced order analytics
- Order prediction and forecasting

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all order service methods
- **State Machine**: Test order state transitions
- **Validation**: Test input validation rules
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all order endpoints
- **Database Integration**: Test order creation and retrieval
- **State Transitions**: Test order state management
- **Admin Operations**: Test admin order management

### E2E Testing
- **Complete Flow**: Test complete order lifecycle
- **Admin Management**: Test admin order management
- **Status Updates**: Test order status updates
- **Performance**: Test performance under load

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Caching**: Implement caching for order data
- **Pagination**: Efficient pagination for order lists
- **State Management**: Efficient order state management
- **Notifications**: Optimize notification delivery

## Success Metrics

- **Performance**: Order queries under 300ms
- **Reliability**: 99.9% uptime for order endpoints
- **Code Quality**: 90%+ test coverage
- **Order Accuracy**: 100% order accuracy
- **Status Updates**: Real-time status updates

## Implementation Notes

### File Structure
```
src/modules/orders/
├── orders.module.ts           # Orders module
├── orders.controller.ts       # Orders controller
├── orders.service.ts          # Orders service
├── admin-orders.controller.ts # Admin orders controller
├── order-state.service.ts     # Order state management
├── dto/
│   ├── order-query.dto.ts     # Order query DTO
│   ├── update-order-status.dto.ts # Update status DTO
│   ├── cancel-order.dto.ts    # Cancel order DTO
│   └── refund-order.dto.ts    # Refund order DTO
├── services/
│   ├── order-notification.service.ts # Order notifications
│   └── order-analytics.service.ts # Order analytics
└── orders.module.spec.ts      # Unit tests
```

### Database Schema
```prisma
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
  trackingNumber  String?
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user  User        @relation(fields: [userId], references: [id])
  items OrderItem[]
  statusHistory OrderStatusHistory[]

  @@map("orders")
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

model OrderStatusHistory {
  id        String      @id @default(cuid())
  orderId   String
  status    OrderStatus
  notes     String?
  updatedBy String
  createdAt DateTime    @default(now())

  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("order_status_history")
  @@index([orderId])
  @@index([status])
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

### Order State Management
```typescript
@Injectable()
export class OrderStateService {
  private readonly validTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.CREATED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
  };

  async updateOrderStatus(orderId: string, newStatus: OrderStatus, notes?: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { statusHistory: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!this.isValidTransition(order.status, newStatus)) {
      throw new BadRequestException(`Invalid status transition from ${order.status} to ${newStatus}`);
    }

    // Update order status
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: { items: true, statusHistory: true },
    });

    // Add status history entry
    await this.prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: newStatus,
        notes,
        updatedBy: 'system', // In real implementation, get from auth context
      },
    });

    // Send notifications
    await this.notificationService.sendOrderStatusUpdate(order, newStatus);

    return updatedOrder;
  }

  private isValidTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
    return this.validTransitions[currentStatus].includes(newStatus);
  }
}
```

## Open Questions

1. **Order Expiration**: How long should unpaid orders remain in CREATED status?
2. **Status Notifications**: What types of status update notifications should we send?
3. **Order Analytics**: What level of order analytics should we implement?
4. **Refund Processing**: Should we integrate with payment systems for refunds?
5. **Order Tracking**: Should we integrate with shipping carriers for tracking?

## Acceptance Criteria

- [ ] Order lifecycle management works correctly
- [ ] Order status state machine works with proper transitions
- [ ] User order history and details work correctly
- [ ] Admin order management works with proper permissions
- [ ] Order status tracking and history work
- [ ] Order analytics and reporting work
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all order operations
- [ ] Performance meets specified benchmarks
- [ ] Order state management is reliable and consistent
