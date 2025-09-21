# PRD: Reviews API (BE-3.1)

## Component/Feature Overview

**Component Name**: Reviews API Module  
**Problem Solved**: Provides comprehensive review management functionality for products with moderation, analytics, and user interaction features  
**Main Goal**: Implement CRUD operations for reviews, review moderation, helpfulness voting, and review analytics while maintaining data integrity and security  
**Component Hierarchy**: `/src/modules/reviews/` - Core reviews module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Moderation**: Review moderation system with admin controls  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `prisma` for database operations
- `bcrypt` for security operations

## User Stories

**US-1**: As a user, I want to submit product reviews so I can share my experience with other customers  
**US-2**: As a user, I want to read product reviews so I can make informed purchase decisions  
**US-3**: As a user, I want to vote on review helpfulness so I can help other customers find useful reviews  
**US-4**: As an admin, I want to moderate reviews so I can maintain content quality  
**US-5**: As a user, I want to edit my reviews so I can update my feedback  
**US-6**: As a system, I want to track review analytics so I can understand customer satisfaction

## Functional Requirements

### FR-1: Review CRUD Operations
- **FR-1.1**: Create review submission endpoint `POST /api/products/:id/reviews`
- **FR-1.2**: Create review retrieval endpoint `GET /api/products/:id/reviews`
- **FR-1.3**: Create review update endpoint `PUT /api/reviews/:id`
- **FR-1.4**: Create review deletion endpoint `DELETE /api/reviews/:id`
- **FR-1.5**: Implement review ownership validation
- **FR-1.6**: Add review status management (pending, approved, rejected)

### FR-2: Review Validation and Security
- **FR-2.1**: Validate review content for inappropriate language
- **FR-2.2**: Implement review length and format validation
- **FR-2.3**: Check user eligibility for review submission
- **FR-2.4**: Prevent duplicate reviews from same user
- **FR-2.5**: Implement review submission rate limiting
- **FR-2.6**: Add review content sanitization

### FR-3: Review Moderation System
- **FR-3.1**: Create admin review moderation endpoint `GET /api/admin/reviews/pending`
- **FR-3.2**: Implement review approval endpoint `POST /api/admin/reviews/:id/approve`
- **FR-3.3**: Create review rejection endpoint `POST /api/admin/reviews/:id/reject`
- **FR-3.4**: Add review flagging system for inappropriate content
- **FR-3.5**: Implement review moderation queue management
- **FR-3.6**: Add review moderation audit trail

### FR-4: Review Interaction Features
- **FR-4.1**: Create review helpfulness voting endpoint `POST /api/reviews/:id/helpful`
- **FR-4.2**: Implement review reporting endpoint `POST /api/reviews/:id/report`
- **FR-4.3**: Add review response system for business owners
- **FR-4.4**: Implement review sharing functionality
- **FR-4.5**: Add review bookmarking for users
- **FR-4.6**: Create review notification system

### FR-5: Review Analytics and Reporting
- **FR-5.1**: Implement review statistics endpoint `GET /api/products/:id/reviews/stats`
- **FR-5.2**: Create review analytics endpoint `GET /api/admin/reviews/analytics`
- **FR-5.3**: Add review sentiment analysis
- **FR-5.4**: Implement review trend tracking
- **FR-5.5**: Create review quality metrics
- **FR-5.6**: Add review performance reporting

### FR-6: Review Search and Filtering
- **FR-6.1**: Implement review search functionality
- **FR-6.2**: Add review filtering by rating, date, helpfulness
- **FR-6.3**: Create review sorting options
- **FR-6.4**: Implement review pagination
- **FR-6.5**: Add review aggregation features
- **FR-6.6**: Create review recommendation system

## Component API Design

### Controller Endpoints
```typescript
@Controller('products/:productId/reviews')
export class ProductReviewsController {
  @Get()
  async getReviews(@Param('productId') productId: string, @Query() query: ReviewQueryDto): Promise<ReviewsResponse>

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(@Param('productId') productId: string, @Body() createReviewDto: CreateReviewDto): Promise<ReviewResponse>
}

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  @Get(':id')
  async getReview(@Param('id') id: string): Promise<ReviewResponse>

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<ReviewResponse>

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<DeleteResponse>

  @Post(':id/helpful')
  async voteHelpful(@Param('id') id: string, @Body() voteDto: VoteDto): Promise<VoteResponse>

  @Post(':id/report')
  async reportReview(@Param('id') id: string, @Body() reportDto: ReportDto): Promise<ReportResponse>
}

@Controller('admin/reviews')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminReviewsController {
  @Get('pending')
  async getPendingReviews(@Query() query: AdminReviewQueryDto): Promise<AdminReviewsResponse>

  @Post(':id/approve')
  async approveReview(@Param('id') id: string): Promise<ReviewResponse>

  @Post(':id/reject')
  async rejectReview(@Param('id') id: string, @Body() rejectDto: RejectReviewDto): Promise<ReviewResponse>

  @Get('analytics')
  async getReviewAnalytics(@Query() query: AnalyticsQueryDto): Promise<AnalyticsResponse>
}
```

### DTOs
```typescript
export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  content: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  content?: string;
}

export class ReviewQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  sortBy?: 'newest' | 'oldest' | 'helpful' | 'rating';

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

export class VoteDto {
  @IsBoolean()
  isHelpful: boolean;
}

export class ReportDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

### Response Types
```typescript
interface ReviewResponse {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  responses?: ReviewResponse[];
}

interface ReviewsResponse {
  reviews: ReviewResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      [key: number]: number;
    };
  };
}

interface AnalyticsResponse {
  totalReviews: number;
  averageRating: number;
  reviewTrends: ReviewTrendData[];
  moderationStats: ModerationStats;
  qualityMetrics: QualityMetrics;
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Pagination**: Proper pagination metadata
- **Moderation**: Clear moderation status and feedback

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for frequently accessed review data
- **Pagination**: Efficient pagination for large review sets
- **Moderation**: Optimize moderation queue processing

## Integration Requirements

### Database Integration
- **Review Entity**: Integrate with Prisma Review model
- **User Entity**: Integrate with Prisma User model
- **Product Entity**: Integrate with Prisma Product model
- **Moderation Entity**: Integrate with Prisma ReviewModeration model

### External Dependencies
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation
- **Security**: Implement proper authentication and authorization
- **Analytics**: Connect with analytics and reporting systems

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Real-time Updates**: Support for real-time review updates
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Advanced sentiment analysis
- Review photo uploads
- Review video support
- Social media integration
- Advanced review analytics
- Review recommendation engine

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all review service methods
- **Validation**: Test input validation rules
- **Moderation**: Test review moderation functionality
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all review endpoints
- **Database Integration**: Test review creation and retrieval
- **Moderation System**: Test review moderation workflow
- **Analytics**: Test review analytics functionality

### E2E Testing
- **Complete Flow**: Test complete review submission and moderation flow
- **User Interaction**: Test review voting and reporting
- **Admin Moderation**: Test admin review moderation
- **Performance**: Test review system performance

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Caching**: Implement caching for review data
- **Pagination**: Efficient pagination for review lists
- **Moderation**: Optimize moderation queue processing
- **Analytics**: Efficient review analytics processing

## Success Metrics

- **Performance**: Review queries under 200ms
- **Reliability**: 99.9% uptime for review endpoints
- **Code Quality**: 90%+ test coverage
- **Moderation**: Efficient review moderation processing
- **User Satisfaction**: High review submission rates

## Implementation Notes

### File Structure
```
src/modules/reviews/
├── reviews.module.ts           # Reviews module
├── reviews.controller.ts       # Reviews controller
├── reviews.service.ts          # Reviews service
├── product-reviews.controller.ts # Product reviews controller
├── admin-reviews.controller.ts # Admin reviews controller
├── dto/
│   ├── create-review.dto.ts    # Create review DTO
│   ├── update-review.dto.ts    # Update review DTO
│   ├── review-query.dto.ts     # Review query DTO
│   ├── vote.dto.ts             # Vote DTO
│   └── report.dto.ts           # Report DTO
├── services/
│   ├── review-moderation.service.ts # Review moderation
│   ├── review-analytics.service.ts # Review analytics
│   └── review-validation.service.ts # Review validation
└── reviews.module.spec.ts      # Unit tests
```

### Database Schema
```prisma
model Review {
  id             String      @id @default(cuid())
  userId         String
  productId      String
  rating         Int         @db.SmallInt
  title          String
  content        String
  isVerified     Boolean     @default(false)
  helpfulCount   Int         @default(0)
  notHelpfulCount Int        @default(0)
  status         ReviewStatus @default(PENDING)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  votes   ReviewVote[]
  reports ReviewReport[]
  responses ReviewResponse[]
  moderation ReviewModeration?

  @@unique([userId, productId])
  @@map("reviews")
  @@index([productId])
  @@index([status])
  @@index([createdAt])
}

model ReviewVote {
  id       String @id @default(cuid())
  reviewId String
  userId   String
  isHelpful Boolean
  createdAt DateTime @default(now())

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([reviewId, userId])
  @@map("review_votes")
}

model ReviewReport {
  id        String @id @default(cuid())
  reviewId  String
  userId    String
  reason    String
  description String?
  status    ReportStatus @default(PENDING)
  createdAt DateTime @default(now())

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("review_reports")
}

model ReviewModeration {
  id        String @id @default(cuid())
  reviewId  String @unique
  moderatorId String
  action    ModerationAction
  reason    String?
  createdAt DateTime @default(now())

  review    Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  moderator User   @relation(fields: [moderatorId], references: [id])

  @@map("review_moderations")
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
  FLAGGED
}

enum ReportStatus {
  PENDING
  RESOLVED
  DISMISSED
}

enum ModerationAction {
  APPROVE
  REJECT
  FLAG
  UNFLAG
}
```

### Review Service Implementation
```typescript
@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    // Check if user already reviewed this product
    const existingReview = await this.prisma.review.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this product');
    }

    // Validate product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Create review
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
        productId,
        status: ReviewStatus.PENDING,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Update product average rating
    await this.updateProductRating(productId);

    return review;
  }

  async getReviews(productId: string, query: ReviewQueryDto): Promise<ReviewsResponse> {
    const where: any = {
      productId,
      status: ReviewStatus.APPROVED,
    };

    if (query.rating) {
      where.rating = query.rating;
    }

    const [reviews, total, stats] = await Promise.all([
      this.prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: this.getSortOrder(query.sortBy),
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.review.count({ where }),
      this.getReviewStats(productId),
    ]);

    return {
      reviews,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
      stats,
    };
  }

  async voteHelpful(reviewId: string, userId: string, isHelpful: boolean): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Check if user already voted
    const existingVote = await this.prisma.reviewVote.findUnique({
      where: { reviewId_userId: { reviewId, userId } },
    });

    if (existingVote) {
      if (existingVote.isHelpful === isHelpful) {
        // Remove vote if same vote
        await this.prisma.reviewVote.delete({
          where: { id: existingVote.id },
        });
      } else {
        // Update vote
        await this.prisma.reviewVote.update({
          where: { id: existingVote.id },
          data: { isHelpful },
        });
      }
    } else {
      // Create new vote
      await this.prisma.reviewVote.create({
        data: { reviewId, userId, isHelpful },
      });
    }

    // Update review vote counts
    await this.updateReviewVoteCounts(reviewId);
  }

  private async updateProductRating(productId: string): Promise<void> {
    const stats = await this.prisma.review.aggregate({
      where: {
        productId,
        status: ReviewStatus.APPROVED,
      },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        averageRating: stats._avg.rating || 0,
        reviewCount: stats._count.rating,
      },
    });
  }

  private async updateReviewVoteCounts(reviewId: string): Promise<void> {
    const [helpfulCount, notHelpfulCount] = await Promise.all([
      this.prisma.reviewVote.count({
        where: { reviewId, isHelpful: true },
      }),
      this.prisma.reviewVote.count({
        where: { reviewId, isHelpful: false },
      }),
    ]);

    await this.prisma.review.update({
      where: { id: reviewId },
      data: { helpfulCount, notHelpfulCount },
    });
  }
}
```

## Open Questions

1. **Review Moderation**: Should we implement automated review moderation?
2. **Review Analytics**: What level of review analytics should we implement?
3. **Review Incentives**: Should we offer incentives for review submission?
4. **Review Response**: Should business owners be able to respond to reviews?
5. **Review Quality**: Should we implement review quality scoring?

## Acceptance Criteria

- [ ] Review CRUD operations work correctly
- [ ] Review moderation system works with proper workflow
- [ ] Review interaction features work (voting, reporting)
- [ ] Review analytics and reporting work correctly
- [ ] Review search and filtering work
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all review operations
- [ ] Performance meets specified benchmarks
- [ ] Review system is secure and reliable
