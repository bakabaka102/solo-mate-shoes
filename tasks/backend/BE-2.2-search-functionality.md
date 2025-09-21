# PRD: Search Functionality (BE-2.2)

## Component/Feature Overview

**Component Name**: Search Service & API  
**Problem Solved**: Provides comprehensive search functionality for products with full-text search, filtering, and relevance ranking  
**Main Goal**: Implement efficient product search with advanced filtering capabilities and search analytics  
**Component Hierarchy**: `/src/modules/products/services/search.service.ts` - Search service with API endpoints

## Technical Specifications

**Component Type**: NestJS Service with Search Algorithms  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Search Engine**: PostgreSQL Full-Text Search with custom ranking  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `prisma` for database operations
- `class-validator` for input validation
- `class-transformer` for data transformation
- `lodash` for utility functions

## User Stories

**US-1**: As a shopper, I want to search for products by name so I can find specific items quickly  
**US-2**: As a shopper, I want to search by product description so I can find products by features  
**US-3**: As a shopper, I want to see search suggestions so I can refine my search  
**US-4**: As a shopper, I want to filter search results so I can narrow down my options  
**US-5**: As a shopper, I want to see relevant results first so I can find what I'm looking for  
**US-6**: As an admin, I want to track search analytics so I can improve the search experience

## Functional Requirements

### FR-1: Full-Text Search
- **FR-1.1**: Implement PostgreSQL full-text search across product titles
- **FR-1.2**: Extend search to product descriptions and tags
- **FR-1.3**: Support search across product categories
- **FR-1.4**: Implement search result ranking by relevance
- **FR-1.5**: Handle search query normalization and stemming
- **FR-1.6**: Support partial word matching and fuzzy search

### FR-2: Advanced Filtering
- **FR-2.1**: Combine search with category filtering
- **FR-2.2**: Implement price range filtering in search results
- **FR-2.3**: Add size and color filtering to search
- **FR-2.4**: Support availability filtering (in stock only)
- **FR-2.5**: Implement brand and feature filtering
- **FR-2.6**: Add date range filtering for new products

### FR-3: Search Suggestions
- **FR-3.1**: Implement autocomplete for search queries
- **FR-3.2**: Provide search suggestions based on popular queries
- **FR-3.3**: Show product name suggestions
- **FR-3.4**: Implement category suggestions
- **FR-3.5**: Add trending search terms
- **FR-3.6**: Support search history for authenticated users

### FR-4: Search Analytics
- **FR-4.1**: Track search queries and results
- **FR-4.2**: Monitor search performance metrics
- **FR-4.3**: Track popular search terms
- **FR-4.4**: Monitor search result click-through rates
- **FR-4.5**: Track search abandonment rates
- **FR-4.6**: Generate search analytics reports

### FR-5: Search Optimization
- **FR-5.1**: Implement search result caching
- **FR-5.2**: Optimize database queries for search performance
- **FR-5.3**: Implement search result pagination
- **FR-5.4**: Add search result highlighting
- **FR-5.5**: Implement search result sorting options
- **FR-5.6**: Support search result export functionality

### FR-6: Search API Endpoints
- **FR-6.1**: Create search endpoint `GET /api/products/search`
- **FR-6.2**: Create autocomplete endpoint `GET /api/products/suggestions`
- **FR-6.3**: Create search analytics endpoint `GET /api/admin/search/analytics`
- **FR-6.4**: Implement search result metadata
- **FR-6.5**: Add search performance monitoring
- **FR-6.6**: Support search API rate limiting

## Component API Design

### Controller Endpoints
```typescript
@Controller('products')
export class ProductsController {
  @Get('search')
  async search(@Query() searchQuery: SearchQueryDto): Promise<SearchResponse>

  @Get('suggestions')
  async getSuggestions(@Query('q') query: string): Promise<SuggestionResponse>
}

@Controller('admin/search')
export class AdminSearchController {
  @Get('analytics')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAnalytics(@Query() analyticsQuery: AnalyticsQueryDto): Promise<AnalyticsResponse>
}
```

### DTOs
```typescript
export class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsString()
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 12;
}

export class SuggestionQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  limit?: number = 5;
}
```

### Response Types
```typescript
interface SearchResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchMetadata: {
    query: string;
    searchTime: number;
    totalResults: number;
    filters: FilterOptions;
  };
}

interface SuggestionResponse {
  suggestions: string[];
  products: Product[];
  categories: Category[];
}

interface AnalyticsResponse {
  popularQueries: Array<{
    query: string;
    count: number;
    avgResults: number;
  }>;
  searchMetrics: {
    totalSearches: number;
    avgSearchTime: number;
    clickThroughRate: number;
    abandonmentRate: number;
  };
  trendingTerms: string[];
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and search metadata
- **Performance**: Fast response times for search queries
- **Caching**: Implement appropriate caching strategies

### Search Experience
- **Relevance**: Most relevant results appear first
- **Performance**: Search results returned quickly
- **Accuracy**: Search results match user intent
- **Completeness**: All relevant products are found
- **Usability**: Search interface is intuitive and accessible

## Integration Requirements

### Database Integration
- **Product Entity**: Search across Product model fields
- **Category Entity**: Include category information in search
- **Variant Entity**: Search across product variants
- **Indexing**: Implement proper database indexing for search

### External Dependencies
- **PostgreSQL**: Use PostgreSQL full-text search capabilities
- **Prisma**: Use Prisma for database operations
- **Validation**: Use class-validator for input validation
- **Caching**: Implement search result caching

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Search Metadata**: Provide search metadata for frontend display
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Elasticsearch integration
- Machine learning-based search
- Voice search functionality
- Image-based search
- Advanced search operators
- Search result personalization

## Testing Requirements

### Unit Testing
- **Search Service**: Test search service methods
- **Query Processing**: Test search query processing
- **Ranking Algorithm**: Test search result ranking
- **Filtering Logic**: Test search filtering functionality
- **Analytics**: Test search analytics collection

### Integration Testing
- **API Endpoints**: Test all search endpoints
- **Database Integration**: Test search with real database
- **Performance**: Test search performance
- **Caching**: Test search result caching

### E2E Testing
- **Complete Flow**: Test complete search experience
- **Search Accuracy**: Test search result accuracy
- **Performance**: Test search performance under load
- **Analytics**: Test search analytics collection

## Performance Considerations

- **Database Queries**: Optimize search queries with proper indexing
- **Caching**: Implement search result caching
- **Pagination**: Efficient pagination for search results
- **Query Optimization**: Optimize search query processing
- **Indexing**: Implement proper database indexing

## Success Metrics

- **Performance**: Search queries under 500ms
- **Accuracy**: High relevance of search results
- **Coverage**: All relevant products found in search
- **User Experience**: High search satisfaction rates
- **Analytics**: Comprehensive search analytics

## Implementation Notes

### File Structure
```
src/modules/products/
├── services/
│   ├── search.service.ts       # Search service
│   ├── search-analytics.service.ts # Search analytics
│   └── search-cache.service.ts # Search caching
├── dto/
│   ├── search-query.dto.ts     # Search query DTO
│   ├── suggestion-query.dto.ts # Suggestion query DTO
│   └── analytics-query.dto.ts  # Analytics query DTO
└── controllers/
    ├── search.controller.ts    # Search controller
    └── admin-search.controller.ts # Admin search controller
```

### Search Implementation
```typescript
@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchProducts(query: SearchQueryDto): Promise<SearchResponse> {
    const startTime = Date.now();
    
    // Build search query
    const searchQuery = this.buildSearchQuery(query);
    
    // Execute search
    const [products, total] = await Promise.all([
      this.prisma.product.findMany(searchQuery),
      this.prisma.product.count({ where: searchQuery.where }),
    ]);

    // Track search analytics
    await this.trackSearchAnalytics(query.q, total, Date.now() - startTime);

    return {
      products,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
      searchMetadata: {
        query: query.q,
        searchTime: Date.now() - startTime,
        totalResults: total,
        filters: this.getFilterOptions(query),
      },
    };
  }

  private buildSearchQuery(query: SearchQueryDto) {
    const where: any = {
      isActive: true,
    };

    // Full-text search
    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
        { category: { name: { contains: query.q, mode: 'insensitive' } } },
      ];
    }

    // Additional filters
    if (query.category) {
      where.categoryId = query.category;
    }

    if (query.minPrice || query.maxPrice) {
      where.defaultPrice = {};
      if (query.minPrice) where.defaultPrice.gte = query.minPrice;
      if (query.maxPrice) where.defaultPrice.lte = query.maxPrice;
    }

    return {
      where,
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: this.getSortOrder(query.sortBy),
    };
  }
}
```

### Database Schema Updates
```sql
-- Add full-text search index
CREATE INDEX products_search_idx ON products USING gin(
  to_tsvector('english', title || ' ' || description)
);

-- Add search analytics table
CREATE TABLE search_analytics (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  result_count INTEGER NOT NULL,
  search_time INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add search suggestions table
CREATE TABLE search_suggestions (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Open Questions

1. **Search Engine**: Should we implement Elasticsearch for advanced search?
2. **Search Analytics**: What level of search analytics should we implement?
3. **Search Caching**: Should we implement Redis for search result caching?
4. **Search Suggestions**: Should we implement machine learning for search suggestions?
5. **Search Performance**: What are the expected search volumes for optimization?

## Acceptance Criteria

- [ ] Full-text search works across product titles and descriptions
- [ ] Search filtering works correctly with all filter types
- [ ] Search suggestions work with autocomplete
- [ ] Search analytics collection works
- [ ] Search performance meets specified benchmarks
- [ ] Search API endpoints work correctly
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all search functionality
- [ ] Performance meets specified benchmarks
- [ ] Search accuracy is high and relevant
