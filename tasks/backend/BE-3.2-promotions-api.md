# PRD: Promotions API (BE-3.2)

## Component/Feature Overview

**Component Name**: Promotions API Module  
**Problem Solved**: Provides comprehensive promotional code and discount management functionality for the SoleMate e-commerce platform  
**Main Goal**: Implement promotional code creation, validation, application, and analytics while maintaining security and business logic integrity  
**Component Hierarchy**: `/src/modules/promotions/` - Core promotions module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Business Logic**: Promotional code validation and discount calculation  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `prisma` for database operations
- `crypto` for secure code generation

## User Stories

**US-1**: As an admin, I want to create promotional codes so I can offer discounts to customers  
**US-2**: As a customer, I want to apply promotional codes so I can get discounts on my purchase  
**US-3**: As a system, I want to validate promotional codes so I can ensure they're used correctly  
**US-4**: As an admin, I want to track promotional code usage so I can measure campaign effectiveness  
**US-5**: As a customer, I want to see available promotions so I can take advantage of special offers  
**US-6**: As a system, I want to enforce promotional code constraints so I can maintain business rules

## Functional Requirements

### FR-1: Promotional Code Management
- **FR-1.1**: Create promotional code creation endpoint `POST /api/admin/promotions`
- **FR-1.2**: Create promotional code retrieval endpoint `GET /api/admin/promotions`
- **FR-1.3**: Create promotional code update endpoint `PUT /api/admin/promotions/:id`
- **FR-1.4**: Create promotional code deletion endpoint `DELETE /api/admin/promotions/:id`
- **FR-1.5**: Implement promotional code status management
- **FR-1.6**: Add promotional code bulk operations

### FR-2: Promotional Code Validation
- **FR-2.1**: Create promotional code validation endpoint `POST /api/promotions/validate`
- **FR-2.2**: Implement promotional code format validation
- **FR-2.3**: Check promotional code expiration dates
- **FR-2.4**: Validate promotional code usage limits
- **FR-2.5**: Check promotional code eligibility requirements
- **FR-2.6**: Implement promotional code conflict resolution

### FR-3: Promotional Code Application
- **FR-3.1**: Create promotional code application endpoint `POST /api/promotions/apply`
- **FR-3.2**: Implement discount calculation logic
- **FR-3.3**: Handle promotional code stacking rules
- **FR-3.4**: Apply promotional code constraints
- **FR-3.5**: Update promotional code usage counts
- **FR-3.6**: Handle promotional code application errors

### FR-4: Promotional Code Analytics
- **FR-4.1**: Create promotional code analytics endpoint `GET /api/admin/promotions/analytics`
- **FR-4.2**: Implement promotional code usage tracking
- **FR-4.3**: Add promotional code performance metrics
- **FR-4.4**: Create promotional code revenue tracking
- **FR-4.5**: Implement promotional code conversion tracking
- **FR-4.6**: Add promotional code ROI calculations

### FR-5: Promotional Code Constraints
- **FR-5.1**: Implement minimum order amount constraints
- **FR-5.2**: Add maximum discount amount constraints
- **FR-5.3**: Implement user eligibility constraints
- **FR-5.4**: Add product category constraints
- **FR-5.5**: Implement time-based constraints
- **FR-5.6**: Add usage frequency constraints

### FR-6: Promotional Code Security
- **FR-6.1**: Implement secure promotional code generation
- **FR-6.2**: Add promotional code encryption for sensitive data
- **FR-6.3**: Implement promotional code rate limiting
- **FR-6.4**: Add promotional code abuse detection
- **FR-6.5**: Implement promotional code audit logging
- **FR-6.6**: Add promotional code access controls

## Component API Design

### Controller Endpoints
```typescript
@Controller('promotions')
export class PromotionsController {
  @Post('validate')
  async validatePromoCode(@Body() validateDto: ValidatePromoCodeDto): Promise<PromoValidationResponse>

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  async applyPromoCode(@Body() applyDto: ApplyPromoCodeDto): Promise<PromoApplicationResponse>

  @Get('offers')
  async getAvailableOffers(@Query() query: OffersQueryDto): Promise<OffersResponse>
}

@Controller('admin/promotions')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminPromotionsController {
  @Get()
  async getPromotions(@Query() query: AdminPromoQueryDto): Promise<AdminPromotionsResponse>

  @Post()
  async createPromotion(@Body() createDto: CreatePromotionDto): Promise<PromotionResponse>

  @Put(':id')
  async updatePromotion(@Param('id') id: string, @Body() updateDto: UpdatePromotionDto): Promise<PromotionResponse>

  @Delete(':id')
  async deletePromotion(@Param('id') id: string): Promise<DeleteResponse>

  @Get('analytics')
  async getPromoAnalytics(@Query() query: AnalyticsQueryDto): Promise<PromoAnalyticsResponse>
}
```

### DTOs
```typescript
export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PromoType)
  type: PromoType;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minOrderAmount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxDiscountAmount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  usageLimit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  usageLimitPerUser?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  eligibleCategories?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  eligibleProducts?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class ValidatePromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  orderAmount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productIds?: string[];
}

export class ApplyPromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsPositive()
  orderAmount: number;

  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
```

### Response Types
```typescript
interface PromotionResponse {
  id: string;
  code: string;
  name: string;
  description: string;
  type: PromoType;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageLimitPerUser?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  eligibleCategories?: string[];
  eligibleProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

interface PromoValidationResponse {
  isValid: boolean;
  discountAmount: number;
  discountType: PromoType;
  message?: string;
  constraints?: PromoConstraints;
}

interface PromoApplicationResponse {
  success: boolean;
  discountAmount: number;
  finalAmount: number;
  message?: string;
}

interface PromoAnalyticsResponse {
  totalPromotions: number;
  activePromotions: number;
  totalUsage: number;
  totalDiscount: number;
  topPromotions: PromotionUsage[];
  usageTrends: PromoUsageTrend[];
  revenueImpact: RevenueImpact;
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Validation**: Comprehensive validation feedback
- **Analytics**: Clear analytics data and metrics

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for promotional code validation
- **Rate Limiting**: Implement rate limiting for promotional code operations
- **Security**: Secure promotional code generation and validation

## Integration Requirements

### Database Integration
- **Promotion Entity**: Integrate with Prisma Promotion model
- **PromoUsage Entity**: Integrate with Prisma PromoUsage model
- **Order Entity**: Integrate with Prisma Order model
- **User Entity**: Integrate with Prisma User model

### External Dependencies
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation
- **Security**: Implement proper authentication and authorization
- **Analytics**: Connect with analytics and reporting systems

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Real-time Updates**: Support for real-time promotional code updates
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Advanced promotional code automation
- Complex promotional code rules engine
- Promotional code A/B testing
- Advanced promotional code analytics
- Promotional code personalization
- Promotional code recommendation engine

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all promotion service methods
- **Validation**: Test promotional code validation logic
- **Discount Calculation**: Test discount calculation algorithms
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all promotion endpoints
- **Database Integration**: Test promotion creation and retrieval
- **Validation System**: Test promotional code validation
- **Analytics**: Test promotional code analytics

### E2E Testing
- **Complete Flow**: Test complete promotional code application flow
- **Admin Management**: Test admin promotional code management
- **Validation**: Test promotional code validation scenarios
- **Performance**: Test promotional code system performance

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Caching**: Implement caching for promotional code validation
- **Rate Limiting**: Implement rate limiting for promotional code operations
- **Security**: Secure promotional code generation and validation
- **Analytics**: Efficient promotional code analytics processing

## Success Metrics

- **Performance**: Promotional code validation under 100ms
- **Reliability**: 99.9% uptime for promotion endpoints
- **Code Quality**: 90%+ test coverage
- **Security**: Secure promotional code generation and validation
- **Business Impact**: High promotional code usage and conversion rates

## Implementation Notes

### File Structure
```
src/modules/promotions/
├── promotions.module.ts        # Promotions module
├── promotions.controller.ts    # Promotions controller
├── promotions.service.ts       # Promotions service
├── admin-promotions.controller.ts # Admin promotions controller
├── dto/
│   ├── create-promotion.dto.ts # Create promotion DTO
│   ├── update-promotion.dto.ts # Update promotion DTO
│   ├── validate-promo-code.dto.ts # Validate promo code DTO
│   └── apply-promo-code.dto.ts # Apply promo code DTO
├── services/
│   ├── promo-validation.service.ts # Promo validation service
│   ├── promo-analytics.service.ts # Promo analytics service
│   └── promo-calculation.service.ts # Promo calculation service
└── promotions.module.spec.ts   # Unit tests
```

### Database Schema
```prisma
model Promotion {
  id                String   @id @default(cuid())
  code              String   @unique
  name              String
  description       String
  type              PromoType
  value             Decimal  @db.Decimal(10, 2)
  minOrderAmount    Decimal? @db.Decimal(10, 2)
  maxDiscountAmount Decimal? @db.Decimal(10, 2)
  usageLimit        Int?
  usageLimitPerUser Int?
  usedCount         Int      @default(0)
  startDate         DateTime
  endDate           DateTime
  isActive          Boolean  @default(true)
  eligibleCategories String[]
  eligibleProducts  String[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  usages PromoUsage[]

  @@map("promotions")
  @@index([code])
  @@index([isActive])
  @@index([startDate])
  @@index([endDate])
}

model PromoUsage {
  id           String   @id @default(cuid())
  promotionId  String
  userId       String
  orderId      String
  discountAmount Decimal @db.Decimal(10, 2)
  createdAt    DateTime @default(now())

  promotion Promotion @relation(fields: [promotionId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  order     Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("promo_usages")
  @@index([promotionId])
  @@index([userId])
  @@index([orderId])
}

enum PromoType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
  BUY_ONE_GET_ONE
}
```

### Promotion Service Implementation
```typescript
@Injectable()
export class PromotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPromotion(createDto: CreatePromotionDto): Promise<Promotion> {
    // Validate promotion constraints
    await this.validatePromotionConstraints(createDto);

    // Generate secure promotional code if not provided
    const code = createDto.code || this.generatePromoCode();

    // Check for code uniqueness
    const existingPromo = await this.prisma.promotion.findUnique({
      where: { code },
    });

    if (existingPromo) {
      throw new ConflictException('Promotional code already exists');
    }

    // Create promotion
    const promotion = await this.prisma.promotion.create({
      data: {
        ...createDto,
        code,
      },
    });

    return promotion;
  }

  async validatePromoCode(validateDto: ValidatePromoCodeDto): Promise<PromoValidationResponse> {
    const promotion = await this.prisma.promotion.findUnique({
      where: { code: validateDto.code },
    });

    if (!promotion) {
      return {
        isValid: false,
        discountAmount: 0,
        discountType: PromoType.PERCENTAGE,
        message: 'Invalid promotional code',
      };
    }

    // Check if promotion is active
    if (!promotion.isActive) {
      return {
        isValid: false,
        discountAmount: 0,
        discountType: promotion.type,
        message: 'Promotional code is not active',
      };
    }

    // Check expiration
    const now = new Date();
    if (now < promotion.startDate || now > promotion.endDate) {
      return {
        isValid: false,
        discountAmount: 0,
        discountType: promotion.type,
        message: 'Promotional code has expired',
      };
    }

    // Check usage limits
    if (promotion.usageLimit && promotion.usedCount >= promotion.usageLimit) {
      return {
        isValid: false,
        discountAmount: 0,
        discountType: promotion.type,
        message: 'Promotional code usage limit reached',
      };
    }

    // Check minimum order amount
    if (promotion.minOrderAmount && validateDto.orderAmount && validateDto.orderAmount < promotion.minOrderAmount) {
      return {
        isValid: false,
        discountAmount: 0,
        discountType: promotion.type,
        message: `Minimum order amount of $${promotion.minOrderAmount} required`,
      };
    }

    // Calculate discount amount
    const discountAmount = this.calculateDiscount(promotion, validateDto.orderAmount || 0);

    return {
      isValid: true,
      discountAmount,
      discountType: promotion.type,
      message: 'Promotional code is valid',
    };
  }

  async applyPromoCode(applyDto: ApplyPromoCodeDto): Promise<PromoApplicationResponse> {
    // Validate promotional code
    const validation = await this.validatePromoCode({
      code: applyDto.code,
      orderAmount: applyDto.orderAmount,
      productIds: applyDto.productIds,
    });

    if (!validation.isValid) {
      throw new BadRequestException(validation.message);
    }

    // Get promotion
    const promotion = await this.prisma.promotion.findUnique({
      where: { code: applyDto.code },
    });

    if (!promotion) {
      throw new NotFoundException('Promotional code not found');
    }

    // Check user usage limit
    if (promotion.usageLimitPerUser) {
      const userUsageCount = await this.prisma.promoUsage.count({
        where: {
          promotionId: promotion.id,
          userId: applyDto.userId,
        },
      });

      if (userUsageCount >= promotion.usageLimitPerUser) {
        throw new BadRequestException('User usage limit reached for this promotional code');
      }
    }

    // Create promo usage record
    await this.prisma.promoUsage.create({
      data: {
        promotionId: promotion.id,
        userId: applyDto.userId,
        orderId: applyDto.orderId,
        discountAmount: validation.discountAmount,
      },
    });

    // Update promotion usage count
    await this.prisma.promotion.update({
      where: { id: promotion.id },
      data: { usedCount: { increment: 1 } },
    });

    return {
      success: true,
      discountAmount: validation.discountAmount,
      finalAmount: applyDto.orderAmount - validation.discountAmount,
      message: 'Promotional code applied successfully',
    };
  }

  private calculateDiscount(promotion: Promotion, orderAmount: number): number {
    let discountAmount = 0;

    switch (promotion.type) {
      case PromoType.PERCENTAGE:
        discountAmount = (orderAmount * promotion.value) / 100;
        break;
      case PromoType.FIXED_AMOUNT:
        discountAmount = promotion.value;
        break;
      case PromoType.FREE_SHIPPING:
        // This would be handled separately in shipping calculation
        discountAmount = 0;
        break;
      case PromoType.BUY_ONE_GET_ONE:
        // This would be handled separately in order calculation
        discountAmount = 0;
        break;
    }

    // Apply maximum discount limit
    if (promotion.maxDiscountAmount && discountAmount > promotion.maxDiscountAmount) {
      discountAmount = promotion.maxDiscountAmount;
    }

    return Math.min(discountAmount, orderAmount);
  }

  private generatePromoCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
```

## Open Questions

1. **Promotional Code Generation**: Should we implement more sophisticated promotional code generation?
2. **Promotional Code Analytics**: What level of promotional code analytics should we implement?
3. **Promotional Code Automation**: Should we implement automated promotional code campaigns?
4. **Promotional Code Personalization**: Should we implement personalized promotional codes?
5. **Promotional Code Security**: What additional security measures should we implement?

## Acceptance Criteria

- [ ] Promotional code CRUD operations work correctly
- [ ] Promotional code validation works with proper constraints
- [ ] Promotional code application works correctly
- [ ] Promotional code analytics and reporting work
- [ ] Promotional code constraints are enforced
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all promotion operations
- [ ] Performance meets specified benchmarks
- [ ] Promotional code system is secure and reliable
