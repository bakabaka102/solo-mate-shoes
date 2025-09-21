# PRD: Inventory & Alerts (BE-3.3)

## Component/Feature Overview

**Component Name**: Inventory Management & Alerts System  
**Problem Solved**: Provides comprehensive inventory tracking, stock management, and automated alerts for low stock situations  
**Main Goal**: Implement inventory management with real-time tracking, automated alerts, and stock optimization while maintaining data accuracy and business continuity  
**Component Hierarchy**: `/src/modules/inventory/` - Core inventory module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Alert System**: Real-time inventory monitoring and notifications  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `prisma` for database operations
- `@nestjs/schedule` for scheduled tasks

## User Stories

**US-1**: As an admin, I want to track inventory levels so I can manage stock effectively  
**US-2**: As a system, I want to automatically decrement inventory when orders are completed so I can maintain accurate stock levels  
**US-3**: As an admin, I want to receive low stock alerts so I can reorder products before they run out  
**US-4**: As a system, I want to prevent overselling so I can maintain customer satisfaction  
**US-5**: As an admin, I want to view inventory reports so I can make informed business decisions  
**US-6**: As a system, I want to track inventory changes so I can maintain audit trails

## Functional Requirements

### FR-1: Inventory Tracking
- **FR-1.1**: Create inventory tracking endpoint `GET /api/admin/inventory`
- **FR-1.2**: Implement real-time inventory level monitoring
- **FR-1.3**: Track inventory changes with audit logs
- **FR-1.4**: Support inventory adjustments and corrections
- **FR-1.5**: Implement inventory reservation system
- **FR-1.6**: Add inventory forecasting capabilities

### FR-2: Stock Management
- **FR-2.1**: Create stock update endpoint `PUT /api/admin/inventory/:id/stock`
- **FR-2.2**: Implement stock increment and decrement operations
- **FR-2.3**: Support bulk stock updates
- **FR-2.4**: Add stock transfer between locations
- **FR-2.5**: Implement stock allocation and reservation
- **FR-2.6**: Support stock reconciliation processes

### FR-3: Low Stock Alerts
- **FR-3.1**: Create low stock alert configuration endpoint `POST /api/admin/inventory/alerts`
- **FR-3.2**: Implement automated low stock detection
- **FR-3.3**: Create alert notification system
- **FR-3.4**: Support multiple alert thresholds
- **FR-3.5**: Implement alert escalation procedures
- **FR-3.6**: Add alert history and tracking

### FR-4: Inventory Analytics
- **FR-4.1**: Create inventory analytics endpoint `GET /api/admin/inventory/analytics`
- **FR-4.2**: Implement inventory turnover calculations
- **FR-4.3**: Add inventory valuation reporting
- **FR-4.4**: Create stock movement analysis
- **FR-4.5**: Implement inventory performance metrics
- **FR-4.6**: Add inventory trend analysis

### FR-5: Order Integration
- **FR-5.1**: Integrate with order completion process
- **FR-5.2**: Implement automatic stock deduction on order completion
- **FR-5.3**: Support order cancellation stock restoration
- **FR-5.4**: Add order reservation and release
- **FR-5.5**: Implement overselling prevention
- **FR-5.6**: Support partial order fulfillment

### FR-6: Inventory Reports
- **FR-6.1**: Create inventory status reports
- **FR-6.2**: Implement low stock reports
- **FR-6.3**: Add inventory movement reports
- **FR-6.4**: Create inventory valuation reports
- **FR-6.5**: Implement inventory aging reports
- **FR-6.6**: Add inventory performance reports

## Component API Design

### Controller Endpoints
```typescript
@Controller('admin/inventory')
@UseGuards(JwtAuthGuard, AdminGuard)
export class InventoryController {
  @Get()
  async getInventory(@Query() query: InventoryQueryDto): Promise<InventoryResponse>

  @Get(':id')
  async getInventoryItem(@Param('id') id: string): Promise<InventoryItemResponse>

  @Put(':id/stock')
  async updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): Promise<InventoryItemResponse>

  @Post(':id/adjust')
  async adjustInventory(@Param('id') id: string, @Body() adjustDto: AdjustInventoryDto): Promise<InventoryItemResponse>

  @Get('alerts')
  async getLowStockAlerts(@Query() query: AlertQueryDto): Promise<AlertsResponse>

  @Post('alerts')
  async createAlert(@Body() createAlertDto: CreateAlertDto): Promise<AlertResponse>

  @Get('analytics')
  async getInventoryAnalytics(@Query() query: AnalyticsQueryDto): Promise<InventoryAnalyticsResponse>
}

@Controller('inventory')
export class PublicInventoryController {
  @Get('check/:productVariantId')
  async checkAvailability(@Param('productVariantId') productVariantId: string): Promise<AvailabilityResponse>
}
```

### DTOs
```typescript
export class UpdateStockDto {
  @IsNumber()
  @IsInt()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AdjustInventoryDto {
  @IsNumber()
  @IsInt()
  adjustment: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  productVariantId: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  threshold: number;

  @IsString()
  @IsNotEmpty()
  alertType: AlertType;

  @IsOptional()
  @IsString()
  message?: string;
}

export class InventoryQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  status?: InventoryStatus;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
```

### Response Types
```typescript
interface InventoryItemResponse {
  id: string;
  productVariantId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  status: InventoryStatus;
  lastUpdated: string;
  productVariant: {
    id: string;
    size: string;
    color: string;
    product: {
      id: string;
      title: string;
      images: string[];
    };
  };
  movements: InventoryMovement[];
}

interface InventoryResponse {
  items: InventoryItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalItems: number;
    lowStockItems: number;
    outOfStockItems: number;
    totalValue: number;
  };
}

interface AlertsResponse {
  alerts: AlertResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface InventoryAnalyticsResponse {
  totalInventory: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  turnoverRate: number;
  topMovingItems: InventoryMovement[];
  slowMovingItems: InventoryMovement[];
  trends: InventoryTrend[];
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Real-time Updates**: Support for real-time inventory updates
- **Analytics**: Clear analytics data and metrics

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for frequently accessed inventory data
- **Real-time Updates**: Optimize real-time inventory monitoring
- **Alert Processing**: Efficient alert processing and notification

## Integration Requirements

### Database Integration
- **Inventory Entity**: Integrate with Prisma Inventory model
- **ProductVariant Entity**: Integrate with Prisma ProductVariant model
- **Order Entity**: Integrate with Prisma Order model
- **Alert Entity**: Integrate with Prisma Alert model

### External Dependencies
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation
- **Scheduling**: Use @nestjs/schedule for scheduled tasks
- **Notifications**: Connect with notification systems

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Real-time Updates**: Support for real-time inventory updates
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Advanced inventory forecasting
- Multi-location inventory management
- Advanced inventory optimization
- Inventory automation
- Advanced inventory analytics
- Inventory integration with external systems

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all inventory service methods
- **Stock Management**: Test stock update and adjustment logic
- **Alert System**: Test alert generation and notification
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all inventory endpoints
- **Database Integration**: Test inventory tracking and updates
- **Order Integration**: Test inventory integration with orders
- **Alert System**: Test alert system functionality

### E2E Testing
- **Complete Flow**: Test complete inventory management flow
- **Stock Updates**: Test stock update and adjustment processes
- **Alert System**: Test alert generation and notification
- **Performance**: Test inventory system performance

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Caching**: Implement caching for inventory data
- **Real-time Updates**: Optimize real-time inventory monitoring
- **Alert Processing**: Efficient alert processing and notification
- **Scheduled Tasks**: Optimize scheduled inventory tasks

## Success Metrics

- **Performance**: Inventory queries under 200ms
- **Reliability**: 99.9% uptime for inventory endpoints
- **Code Quality**: 90%+ test coverage
- **Accuracy**: 100% inventory accuracy
- **Alert Effectiveness**: High alert response rates

## Implementation Notes

### File Structure
```
src/modules/inventory/
├── inventory.module.ts         # Inventory module
├── inventory.controller.ts     # Inventory controller
├── inventory.service.ts        # Inventory service
├── public-inventory.controller.ts # Public inventory controller
├── dto/
│   ├── update-stock.dto.ts     # Update stock DTO
│   ├── adjust-inventory.dto.ts # Adjust inventory DTO
│   ├── create-alert.dto.ts     # Create alert DTO
│   └── inventory-query.dto.ts  # Inventory query DTO
├── services/
│   ├── inventory-alert.service.ts # Inventory alert service
│   ├── inventory-analytics.service.ts # Inventory analytics
│   └── inventory-scheduler.service.ts # Inventory scheduler
└── inventory.module.spec.ts    # Unit tests
```

### Database Schema
```prisma
model Inventory {
  id                String          @id @default(cuid())
  productVariantId  String          @unique
  currentStock      Int             @default(0)
  reservedStock     Int             @default(0)
  lowStockThreshold Int             @default(10)
  status            InventoryStatus @default(IN_STOCK)
  lastUpdated       DateTime        @default(now())
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  productVariant ProductVariant @relation(fields: [productVariantId], references: [id], onDelete: Cascade)
  movements     InventoryMovement[]
  alerts        InventoryAlert[]

  @@map("inventory")
  @@index([status])
  @@index([currentStock])
}

model InventoryMovement {
  id          String            @id @default(cuid())
  inventoryId String
  type        MovementType
  quantity    Int
  reason      String
  notes       String?
  createdAt   DateTime          @default(now())

  inventory Inventory @relation(fields: [inventoryId], references: [id], onDelete: Cascade)

  @@map("inventory_movements")
  @@index([inventoryId])
  @@index([type])
  @@index([createdAt])
}

model InventoryAlert {
  id                String    @id @default(cuid())
  inventoryId       String
  alertType         AlertType
  threshold         Int
  message           String?
  isActive          Boolean   @default(true)
  triggeredAt       DateTime?
  resolvedAt        DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  inventory Inventory @relation(fields: [inventoryId], references: [id], onDelete: Cascade)

  @@map("inventory_alerts")
  @@index([inventoryId])
  @@index([alertType])
  @@index([isActive])
}

enum InventoryStatus {
  IN_STOCK
  LOW_STOCK
  OUT_OF_STOCK
  DISCONTINUED
}

enum MovementType {
  INBOUND
  OUTBOUND
  ADJUSTMENT
  RESERVATION
  RELEASE
}

enum AlertType {
  LOW_STOCK
  OUT_OF_STOCK
  OVERSTOCK
  MOVEMENT_ANOMALY
}
```

### Inventory Service Implementation
```typescript
@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly alertService: InventoryAlertService,
    private readonly schedulerService: InventorySchedulerService,
  ) {}

  async updateStock(inventoryId: string, updateStockDto: UpdateStockDto): Promise<InventoryItemResponse> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: inventoryId },
      include: {
        productVariant: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    const oldStock = inventory.currentStock;
    const newStock = updateStockDto.quantity;

    // Update inventory
    const updatedInventory = await this.prisma.inventory.update({
      where: { id: inventoryId },
      data: {
        currentStock: newStock,
        lastUpdated: new Date(),
        status: this.calculateInventoryStatus(newStock, inventory.lowStockThreshold),
      },
    });

    // Create movement record
    await this.prisma.inventoryMovement.create({
      data: {
        inventoryId,
        type: MovementType.ADJUSTMENT,
        quantity: newStock - oldStock,
        reason: updateStockDto.reason,
        notes: updateStockDto.notes,
      },
    });

    // Check for alerts
    await this.checkAndTriggerAlerts(updatedInventory);

    return this.formatInventoryResponse(updatedInventory);
  }

  async adjustInventory(inventoryId: string, adjustDto: AdjustInventoryDto): Promise<InventoryItemResponse> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    const newStock = inventory.currentStock + adjustDto.adjustment;

    if (newStock < 0) {
      throw new BadRequestException('Insufficient stock for adjustment');
    }

    return this.updateStock(inventoryId, {
      quantity: newStock,
      reason: adjustDto.reason,
      notes: adjustDto.notes,
    });
  }

  async decrementStock(productVariantId: string, quantity: number, reason: string): Promise<void> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productVariantId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (inventory.currentStock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const newStock = inventory.currentStock - quantity;

    await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        currentStock: newStock,
        lastUpdated: new Date(),
        status: this.calculateInventoryStatus(newStock, inventory.lowStockThreshold),
      },
    });

    // Create movement record
    await this.prisma.inventoryMovement.create({
      data: {
        inventoryId: inventory.id,
        type: MovementType.OUTBOUND,
        quantity: -quantity,
        reason,
      },
    });

    // Check for alerts
    await this.checkAndTriggerAlerts(inventory);
  }

  async reserveStock(productVariantId: string, quantity: number): Promise<void> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productVariantId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    const availableStock = inventory.currentStock - inventory.reservedStock;

    if (availableStock < quantity) {
      throw new BadRequestException('Insufficient available stock');
    }

    await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        reservedStock: inventory.reservedStock + quantity,
      },
    });

    // Create movement record
    await this.prisma.inventoryMovement.create({
      data: {
        inventoryId: inventory.id,
        type: MovementType.RESERVATION,
        quantity: quantity,
        reason: 'Order reservation',
      },
    });
  }

  async releaseReservedStock(productVariantId: string, quantity: number): Promise<void> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productVariantId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (inventory.reservedStock < quantity) {
      throw new BadRequestException('Insufficient reserved stock');
    }

    await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        reservedStock: inventory.reservedStock - quantity,
      },
    });

    // Create movement record
    await this.prisma.inventoryMovement.create({
      data: {
        inventoryId: inventory.id,
        type: MovementType.RELEASE,
        quantity: -quantity,
        reason: 'Order cancellation',
      },
    });
  }

  private calculateInventoryStatus(currentStock: number, lowStockThreshold: number): InventoryStatus {
    if (currentStock === 0) {
      return InventoryStatus.OUT_OF_STOCK;
    } else if (currentStock <= lowStockThreshold) {
      return InventoryStatus.LOW_STOCK;
    } else {
      return InventoryStatus.IN_STOCK;
    }
  }

  private async checkAndTriggerAlerts(inventory: Inventory): Promise<void> {
    const alerts = await this.prisma.inventoryAlert.findMany({
      where: {
        inventoryId: inventory.id,
        isActive: true,
      },
    });

    for (const alert of alerts) {
      if (this.shouldTriggerAlert(inventory, alert)) {
        await this.alertService.triggerAlert(alert, inventory);
      }
    }
  }

  private shouldTriggerAlert(inventory: Inventory, alert: InventoryAlert): boolean {
    switch (alert.alertType) {
      case AlertType.LOW_STOCK:
        return inventory.currentStock <= alert.threshold && inventory.currentStock > 0;
      case AlertType.OUT_OF_STOCK:
        return inventory.currentStock === 0;
      case AlertType.OVERSTOCK:
        return inventory.currentStock >= alert.threshold;
      default:
        return false;
    }
  }
}
```

## Open Questions

1. **Inventory Forecasting**: Should we implement inventory forecasting capabilities?
2. **Multi-location**: Should we support multi-location inventory management?
3. **Automation**: Should we implement automated inventory management?
4. **Integration**: Should we integrate with external inventory systems?
5. **Analytics**: What level of inventory analytics should we implement?

## Acceptance Criteria

- [ ] Inventory tracking works correctly with real-time updates
- [ ] Stock management operations work correctly
- [ ] Low stock alerts work with proper notification
- [ ] Inventory analytics and reporting work
- [ ] Order integration works correctly
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all inventory operations
- [ ] Performance meets specified benchmarks
- [ ] Inventory system is accurate and reliable
