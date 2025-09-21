# PRD: Basic Analytics Endpoints (BE-3.4)

## Component/Feature Overview

**Component Name**: Basic Analytics Endpoints  
**Problem Solved**: Provides essential business analytics and reporting functionality for the SoleMate e-commerce platform  
**Main Goal**: Implement basic analytics endpoints for orders, revenue, and product performance while maintaining data accuracy and performance  
**Component Hierarchy**: `/src/modules/analytics/` - Core analytics module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Analytics**: Basic business metrics and reporting  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `prisma` for database operations
- `date-fns` for date manipulation

## User Stories

**US-1**: As an admin, I want to see daily order statistics so I can monitor business performance  
**US-2**: As an admin, I want to view revenue trends so I can track financial performance  
**US-3**: As an admin, I want to see top-performing products so I can optimize inventory  
**US-4**: As an admin, I want to view customer analytics so I can understand user behavior  
**US-5**: As an admin, I want to see conversion rates so I can optimize the sales funnel  
**US-6**: As a system, I want to provide analytics data efficiently so I can support business decisions

## Functional Requirements

### FR-1: Order Analytics
- **FR-1.1**: Create order analytics endpoint `GET /api/admin/analytics/orders`
- **FR-1.2**: Implement daily order count tracking
- **FR-1.3**: Add order status distribution analytics
- **FR-1.4**: Create order completion rate tracking
- **FR-1.5**: Implement order cancellation analytics
- **FR-1.6**: Add order processing time analytics

### FR-2: Revenue Analytics
- **FR-2.1**: Create revenue analytics endpoint `GET /api/admin/analytics/revenue`
- **FR-2.2**: Implement daily revenue tracking
- **FR-2.3**: Add revenue trend analysis
- **FR-2.4**: Create average order value tracking
- **FR-2.5**: Implement revenue by product category
- **FR-2.6**: Add revenue growth rate calculations

### FR-3: Product Analytics
- **FR-3.1**: Create product analytics endpoint `GET /api/admin/analytics/products`
- **FR-3.2**: Implement top-selling products tracking
- **FR-3.3**: Add product performance metrics
- **FR-3.4**: Create product category analytics
- **FR-3.5**: Implement product inventory analytics
- **FR-3.6**: Add product review analytics

### FR-4: Customer Analytics
- **FR-4.1**: Create customer analytics endpoint `GET /api/admin/analytics/customers`
- **FR-4.2**: Implement customer growth tracking
- **FR-4.3**: Add customer retention analytics
- **FR-4.4**: Create customer lifetime value tracking
- **FR-4.5**: Implement customer segmentation analytics
- **FR-4.6**: Add customer acquisition analytics

### FR-5: Conversion Analytics
- **FR-5.1**: Create conversion analytics endpoint `GET /api/admin/analytics/conversion`
- **FR-5.2**: Implement conversion rate tracking
- **FR-5.3**: Add funnel analysis
- **FR-5.4**: Create cart abandonment analytics
- **FR-5.5**: Implement checkout completion rates
- **FR-5.6**: Add page view analytics

### FR-6: Dashboard Analytics
- **FR-6.1**: Create dashboard analytics endpoint `GET /api/admin/analytics/dashboard`
- **FR-6.2**: Implement key performance indicators
- **FR-6.3**: Add real-time metrics
- **FR-6.4**: Create summary statistics
- **FR-6.5**: Implement trend indicators
- **FR-6.6**: Add comparative analytics

## Component API Design

### Controller Endpoints
```typescript
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AnalyticsController {
  @Get('dashboard')
  async getDashboardAnalytics(@Query() query: DashboardQueryDto): Promise<DashboardAnalyticsResponse>

  @Get('orders')
  async getOrderAnalytics(@Query() query: OrderAnalyticsQueryDto): Promise<OrderAnalyticsResponse>

  @Get('revenue')
  async getRevenueAnalytics(@Query() query: RevenueAnalyticsQueryDto): Promise<RevenueAnalyticsResponse>

  @Get('products')
  async getProductAnalytics(@Query() query: ProductAnalyticsQueryDto): Promise<ProductAnalyticsResponse>

  @Get('customers')
  async getCustomerAnalytics(@Query() query: CustomerAnalyticsQueryDto): Promise<CustomerAnalyticsResponse>

  @Get('conversion')
  async getConversionAnalytics(@Query() query: ConversionAnalyticsQueryDto): Promise<ConversionAnalyticsResponse>
}
```

### DTOs
```typescript
export class DashboardQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  period?: 'day' | 'week' | 'month' | 'year';
}

export class OrderAnalyticsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  groupBy?: 'day' | 'week' | 'month';
}

export class RevenueAnalyticsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  groupBy?: 'day' | 'week' | 'month';

  @IsOptional()
  @IsString()
  category?: string;
}

export class ProductAnalyticsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: 'sales' | 'revenue' | 'views' | 'rating';
}
```

### Response Types
```typescript
interface DashboardAnalyticsResponse {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    averageOrderValue: number;
    conversionRate: number;
    growthRate: number;
  };
  trends: {
    orders: TrendData[];
    revenue: TrendData[];
    customers: TrendData[];
  };
  topProducts: ProductPerformance[];
  recentOrders: OrderSummary[];
  alerts: AnalyticsAlert[];
}

interface OrderAnalyticsResponse {
  totalOrders: number;
  ordersByStatus: {
    [key in OrderStatus]: number;
  };
  ordersByPeriod: OrderPeriodData[];
  averageOrderValue: number;
  orderCompletionRate: number;
  cancellationRate: number;
  processingTime: {
    average: number;
    median: number;
  };
}

interface RevenueAnalyticsResponse {
  totalRevenue: number;
  revenueByPeriod: RevenuePeriodData[];
  revenueByCategory: CategoryRevenue[];
  averageOrderValue: number;
  revenueGrowth: number;
  topRevenueProducts: ProductRevenue[];
}

interface ProductAnalyticsResponse {
  topProducts: ProductPerformance[];
  productCategories: CategoryPerformance[];
  inventoryStatus: InventoryStatus;
  productReviews: ReviewAnalytics;
  productViews: ViewAnalytics;
}

interface CustomerAnalyticsResponse {
  totalCustomers: number;
  newCustomers: number;
  customerGrowth: number;
  customerRetention: number;
  averageLifetimeValue: number;
  customerSegments: CustomerSegment[];
  acquisitionChannels: AcquisitionChannel[];
}

interface ConversionAnalyticsResponse {
  overallConversionRate: number;
  funnelMetrics: FunnelMetric[];
  cartAbandonmentRate: number;
  checkoutCompletionRate: number;
  pageViews: PageViewData[];
  sessionMetrics: SessionMetric[];
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Performance**: Fast response times for analytics queries
- **Caching**: Implement caching for frequently accessed analytics data

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for analytics data
- **Aggregation**: Optimize data aggregation and processing
- **Real-time**: Support for real-time analytics updates

## Integration Requirements

### Database Integration
- **Order Entity**: Integrate with Prisma Order model
- **Product Entity**: Integrate with Prisma Product model
- **User Entity**: Integrate with Prisma User model
- **Review Entity**: Integrate with Prisma Review model

### External Dependencies
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation
- **Date Handling**: Use date-fns for date manipulation
- **Caching**: Implement caching for analytics data

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Real-time Updates**: Support for real-time analytics updates
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Advanced analytics and machine learning
- Real-time analytics dashboard
- Advanced data visualization
- Custom analytics queries
- Advanced reporting features
- Analytics automation

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all analytics service methods
- **Data Aggregation**: Test data aggregation logic
- **Calculations**: Test analytics calculations
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all analytics endpoints
- **Database Integration**: Test analytics data retrieval
- **Performance**: Test analytics query performance
- **Caching**: Test analytics data caching

### E2E Testing
- **Complete Flow**: Test complete analytics data flow
- **Performance**: Test analytics system performance
- **Data Accuracy**: Test analytics data accuracy
- **Real-time Updates**: Test real-time analytics updates

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Caching**: Implement caching for analytics data
- **Aggregation**: Optimize data aggregation and processing
- **Real-time**: Support for real-time analytics updates
- **Scheduled Tasks**: Optimize scheduled analytics tasks

## Success Metrics

- **Performance**: Analytics queries under 1 second
- **Reliability**: 99.9% uptime for analytics endpoints
- **Code Quality**: 90%+ test coverage
- **Data Accuracy**: 100% analytics data accuracy
- **Business Value**: High analytics usage and insights

## Implementation Notes

### File Structure
```
src/modules/analytics/
├── analytics.module.ts         # Analytics module
├── analytics.controller.ts     # Analytics controller
├── analytics.service.ts        # Analytics service
├── dto/
│   ├── dashboard-query.dto.ts  # Dashboard query DTO
│   ├── order-analytics-query.dto.ts # Order analytics query DTO
│   ├── revenue-analytics-query.dto.ts # Revenue analytics query DTO
│   ├── product-analytics-query.dto.ts # Product analytics query DTO
│   ├── customer-analytics-query.dto.ts # Customer analytics query DTO
│   └── conversion-analytics-query.dto.ts # Conversion analytics query DTO
├── services/
│   ├── order-analytics.service.ts # Order analytics service
│   ├── revenue-analytics.service.ts # Revenue analytics service
│   ├── product-analytics.service.ts # Product analytics service
│   ├── customer-analytics.service.ts # Customer analytics service
│   └── conversion-analytics.service.ts # Conversion analytics service
└── analytics.module.spec.ts    # Unit tests
```

### Analytics Service Implementation
```typescript
@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardAnalytics(query: DashboardQueryDto): Promise<DashboardAnalyticsResponse> {
    const { startDate, endDate, period } = query;
    const dateRange = this.getDateRange(startDate, endDate, period);

    const [
      summary,
      orderTrends,
      revenueTrends,
      customerTrends,
      topProducts,
      recentOrders,
    ] = await Promise.all([
      this.getSummaryMetrics(dateRange),
      this.getOrderTrends(dateRange, period),
      this.getRevenueTrends(dateRange, period),
      this.getCustomerTrends(dateRange, period),
      this.getTopProducts(dateRange, 5),
      this.getRecentOrders(10),
    ]);

    return {
      summary,
      trends: {
        orders: orderTrends,
        revenue: revenueTrends,
        customers: customerTrends,
      },
      topProducts,
      recentOrders,
      alerts: await this.getAnalyticsAlerts(),
    };
  }

  async getOrderAnalytics(query: OrderAnalyticsQueryDto): Promise<OrderAnalyticsResponse> {
    const { startDate, endDate, status, groupBy } = query;
    const dateRange = this.getDateRange(startDate, endDate, groupBy);

    const [
      totalOrders,
      ordersByStatus,
      ordersByPeriod,
      averageOrderValue,
      orderCompletionRate,
      cancellationRate,
      processingTime,
    ] = await Promise.all([
      this.getTotalOrders(dateRange, status),
      this.getOrdersByStatus(dateRange),
      this.getOrdersByPeriod(dateRange, groupBy),
      this.getAverageOrderValue(dateRange),
      this.getOrderCompletionRate(dateRange),
      this.getCancellationRate(dateRange),
      this.getProcessingTime(dateRange),
    ]);

    return {
      totalOrders,
      ordersByStatus,
      ordersByPeriod,
      averageOrderValue,
      orderCompletionRate,
      cancellationRate,
      processingTime,
    };
  }

  async getRevenueAnalytics(query: RevenueAnalyticsQueryDto): Promise<RevenueAnalyticsResponse> {
    const { startDate, endDate, groupBy, category } = query;
    const dateRange = this.getDateRange(startDate, endDate, groupBy);

    const [
      totalRevenue,
      revenueByPeriod,
      revenueByCategory,
      averageOrderValue,
      revenueGrowth,
      topRevenueProducts,
    ] = await Promise.all([
      this.getTotalRevenue(dateRange, category),
      this.getRevenueByPeriod(dateRange, groupBy),
      this.getRevenueByCategory(dateRange),
      this.getAverageOrderValue(dateRange),
      this.getRevenueGrowth(dateRange),
      this.getTopRevenueProducts(dateRange, 10),
    ]);

    return {
      totalRevenue,
      revenueByPeriod,
      revenueByCategory,
      averageOrderValue,
      revenueGrowth,
      topRevenueProducts,
    };
  }

  async getProductAnalytics(query: ProductAnalyticsQueryDto): Promise<ProductAnalyticsResponse> {
    const { startDate, endDate, limit, sortBy } = query;
    const dateRange = this.getDateRange(startDate, endDate);

    const [
      topProducts,
      productCategories,
      inventoryStatus,
      productReviews,
      productViews,
    ] = await Promise.all([
      this.getTopProducts(dateRange, limit, sortBy),
      this.getProductCategories(dateRange),
      this.getInventoryStatus(),
      this.getProductReviews(dateRange),
      this.getProductViews(dateRange),
    ]);

    return {
      topProducts,
      productCategories,
      inventoryStatus,
      productReviews,
      productViews,
    };
  }

  async getCustomerAnalytics(query: CustomerAnalyticsQueryDto): Promise<CustomerAnalyticsResponse> {
    const { startDate, endDate } = query;
    const dateRange = this.getDateRange(startDate, endDate);

    const [
      totalCustomers,
      newCustomers,
      customerGrowth,
      customerRetention,
      averageLifetimeValue,
      customerSegments,
      acquisitionChannels,
    ] = await Promise.all([
      this.getTotalCustomers(),
      this.getNewCustomers(dateRange),
      this.getCustomerGrowth(dateRange),
      this.getCustomerRetention(dateRange),
      this.getAverageLifetimeValue(dateRange),
      this.getCustomerSegments(dateRange),
      this.getAcquisitionChannels(dateRange),
    ]);

    return {
      totalCustomers,
      newCustomers,
      customerGrowth,
      customerRetention,
      averageLifetimeValue,
      customerSegments,
      acquisitionChannels,
    };
  }

  async getConversionAnalytics(query: ConversionAnalyticsQueryDto): Promise<ConversionAnalyticsResponse> {
    const { startDate, endDate } = query;
    const dateRange = this.getDateRange(startDate, endDate);

    const [
      overallConversionRate,
      funnelMetrics,
      cartAbandonmentRate,
      checkoutCompletionRate,
      pageViews,
      sessionMetrics,
    ] = await Promise.all([
      this.getOverallConversionRate(dateRange),
      this.getFunnelMetrics(dateRange),
      this.getCartAbandonmentRate(dateRange),
      this.getCheckoutCompletionRate(dateRange),
      this.getPageViews(dateRange),
      this.getSessionMetrics(dateRange),
    ]);

    return {
      overallConversionRate,
      funnelMetrics,
      cartAbandonmentRate,
      checkoutCompletionRate,
      pageViews,
      sessionMetrics,
    };
  }

  private async getSummaryMetrics(dateRange: DateRange) {
    const [totalOrders, totalRevenue, totalCustomers, averageOrderValue] = await Promise.all([
      this.prisma.order.count({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
        },
      }),
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          status: { in: [OrderStatus.COMPLETED, OrderStatus.DELIVERED] },
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.user.count({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
        },
      }),
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: dateRange.start, lte: dateRange.end },
          status: { in: [OrderStatus.COMPLETED, OrderStatus.DELIVERED] },
        },
        _avg: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalCustomers,
      averageOrderValue: averageOrderValue._avg.totalAmount || 0,
      conversionRate: await this.getOverallConversionRate(dateRange),
      growthRate: await this.getGrowthRate(dateRange),
    };
  }

  private async getTopProducts(dateRange: DateRange, limit: number, sortBy?: string) {
    const orderBy = this.getProductSortOrder(sortBy);

    return this.prisma.product.findMany({
      where: {
        orders: {
          some: {
            createdAt: { gte: dateRange.start, lte: dateRange.end },
            status: { in: [OrderStatus.COMPLETED, OrderStatus.DELIVERED] },
          },
        },
      },
      include: {
        _count: {
          select: {
            orders: {
              where: {
                createdAt: { gte: dateRange.start, lte: dateRange.end },
                status: { in: [OrderStatus.COMPLETED, OrderStatus.DELIVERED] },
              },
            },
          },
        },
      },
      orderBy,
      take: limit,
    });
  }

  private getDateRange(startDate?: string, endDate?: string, period?: string): DateRange {
    const now = new Date();
    const start = startDate ? new Date(startDate) : this.getPeriodStart(now, period);
    const end = endDate ? new Date(endDate) : now;

    return { start, end };
  }

  private getPeriodStart(date: Date, period?: string): Date {
    switch (period) {
      case 'day':
        return startOfDay(date);
      case 'week':
        return startOfWeek(date);
      case 'month':
        return startOfMonth(date);
      case 'year':
        return startOfYear(date);
      default:
        return subDays(date, 30);
    }
  }

  private getProductSortOrder(sortBy?: string) {
    switch (sortBy) {
      case 'sales':
        return { orders: { _count: 'desc' } };
      case 'revenue':
        return { defaultPrice: 'desc' };
      case 'views':
        return { views: 'desc' };
      case 'rating':
        return { averageRating: 'desc' };
      default:
        return { orders: { _count: 'desc' } };
    }
  }
}
```

## Open Questions

1. **Analytics Depth**: What level of analytics detail should we provide?
2. **Real-time Updates**: Should we implement real-time analytics updates?
3. **Data Retention**: How long should we retain analytics data?
4. **Custom Queries**: Should we support custom analytics queries?
5. **Export Functionality**: Should we provide analytics data export?

## Acceptance Criteria

- [ ] Dashboard analytics work correctly with key metrics
- [ ] Order analytics provide comprehensive order insights
- [ ] Revenue analytics track financial performance
- [ ] Product analytics show product performance
- [ ] Customer analytics provide customer insights
- [ ] Conversion analytics track conversion rates
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all analytics operations
- [ ] Performance meets specified benchmarks
- [ ] Analytics data is accurate and reliable
