# PRD: Products API (BE-2.1)

## Component/Feature Overview

**Component Name**: Products API Module  
**Problem Solved**: Provides comprehensive product management functionality for the SoleMate e-commerce platform  
**Main Goal**: Implement CRUD operations for products, categories, and variants with image upload, filtering, and search capabilities  
**Component Hierarchy**: `/src/modules/products/` - Core products module with controllers, services, and DTOs

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and DTOs  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**File Storage**: AWS S3 for product images  
**Required Dependencies**: 
- `@nestjs/common` for core NestJS functionality
- `@nestjs/swagger` for API documentation
- `class-validator` for input validation
- `class-transformer` for data transformation
- `multer` for file uploads
- `aws-sdk` for S3 integration
- `prisma` for database operations

## User Stories

**US-1**: As a shopper, I want to browse products with filtering and search so I can find what I'm looking for  
**US-2**: As a shopper, I want to view detailed product information so I can make informed purchase decisions  
**US-3**: As an admin, I want to manage products so I can keep the catalog up to date  
**US-4**: As an admin, I want to upload product images so I can showcase products effectively  
**US-5**: As a developer, I want well-documented API endpoints so I can integrate with the frontend  
**US-6**: As a system, I want optimized database queries so the application performs well

## Functional Requirements

### FR-1: Product CRUD Operations
- **FR-1.1**: Create product creation endpoint `POST /api/admin/products`
- **FR-1.2**: Create product retrieval endpoint `GET /api/products/:slug`
- **FR-1.3**: Create product update endpoint `PUT /api/admin/products/:id`
- **FR-1.4**: Create product deletion endpoint `DELETE /api/admin/products/:id`
- **FR-1.5**: Implement soft delete functionality for products
- **FR-1.6**: Add product status management (active/inactive)

### FR-2: Product Listing and Filtering
- **FR-2.1**: Create product listing endpoint `GET /api/products`
- **FR-2.2**: Implement pagination with configurable page size
- **FR-2.3**: Add filtering by category, price range, size, color
- **FR-2.4**: Implement sorting by price, name, rating, newest
- **FR-2.5**: Add search functionality across title and description
- **FR-2.6**: Return filter options and metadata with results

### FR-3: Product Variants Management
- **FR-3.1**: Create variant creation endpoint for products
- **FR-3.2**: Implement variant update and deletion
- **FR-3.3**: Manage variant inventory levels
- **FR-3.4**: Handle variant pricing and availability
- **FR-3.5**: Support variant-specific images
- **FR-3.6**: Implement variant validation and constraints

### FR-4: Image Upload and Management
- **FR-4.1**: Implement image upload endpoint with S3 integration
- **FR-4.2**: Support multiple image formats (JPEG, PNG, WebP)
- **FR-4.3**: Implement image resizing and optimization
- **FR-4.4**: Add image deletion functionality
- **FR-4.5**: Support image ordering and primary image selection
- **FR-4.6**: Implement image validation and security checks

### FR-5: Category Management
- **FR-5.1**: Create category CRUD endpoints
- **FR-5.2**: Implement hierarchical category structure
- **FR-5.3**: Add category image and description support
- **FR-5.4**: Implement category slug generation
- **FR-5.5**: Add category product count tracking
- **FR-5.6**: Support category reordering and nesting

### FR-6: Search and Analytics
- **FR-6.1**: Implement full-text search across products
- **FR-6.2**: Add search result ranking and relevance
- **FR-6.3**: Implement search analytics and tracking
- **FR-6.4**: Add product view tracking
- **FR-6.5**: Implement popular products analytics
- **FR-6.6**: Add search suggestions and autocomplete

## Component API Design

### Controller Endpoints
```typescript
@Controller('products')
export class ProductsController {
  @Get()
  async findAll(@Query() query: ProductQueryDto): Promise<PaginatedProductsResponse>

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<ProductResponse>

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponse>

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponse>

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<DeleteResponse>
}

@Controller('admin/products')
export class AdminProductsController {
  @Post('upload')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<ImageUploadResponse>
}
```

### DTOs
```typescript
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  defaultPrice: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  variants: CreateProductVariantDto[];
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

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
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating' | 'newest';

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
```

### Response Types
```typescript
interface ProductResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  defaultPrice: number;
  category: Category;
  images: string[];
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedProductsResponse {
  products: ProductResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    categories: Category[];
    sizes: string[];
    colors: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Pagination**: Proper pagination metadata
- **Filtering**: Comprehensive filter options and metadata

### Performance Considerations
- **Database Optimization**: Efficient queries with proper indexing
- **Caching**: Implement caching for frequently accessed data
- **Image Optimization**: Optimize images for web delivery
- **Pagination**: Efficient pagination implementation

## Integration Requirements

### Database Integration
- **Product Entity**: Integrate with Prisma Product model
- **Category Entity**: Integrate with Prisma Category model
- **Variant Entity**: Integrate with Prisma ProductVariant model
- **Image Storage**: Integrate with AWS S3 for image storage

### External Dependencies
- **AWS S3**: Use AWS SDK for image storage
- **Multer**: Use Multer for file upload handling
- **Validation**: Use class-validator for input validation
- **Documentation**: Use Swagger for API documentation

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Image URLs**: Provide optimized image URLs for frontend
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Product recommendations engine
- Advanced inventory management
- Product comparison features
- Social media integration
- Product video support
- Advanced analytics dashboard

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all product service methods
- **Validation**: Test input validation rules
- **Image Upload**: Test image upload functionality
- **Error Handling**: Test error scenarios
- **Database Operations**: Test database operations

### Integration Testing
- **API Endpoints**: Test all product endpoints
- **Database Integration**: Test product creation and retrieval
- **Image Upload**: Test S3 integration
- **Search Functionality**: Test search and filtering

### E2E Testing
- **Complete Flow**: Test complete product management flow
- **Admin Operations**: Test admin product management
- **Search Flow**: Test product search and filtering
- **Image Management**: Test image upload and management

## Performance Considerations

- **Database Queries**: Optimize queries with proper indexing
- **Image Processing**: Efficient image resizing and optimization
- **Caching**: Implement caching for product data
- **Pagination**: Efficient pagination implementation
- **Search**: Optimize search queries and indexing

## Success Metrics

- **Performance**: Product queries under 200ms
- **Reliability**: 99.9% uptime for product endpoints
- **Code Quality**: 90%+ test coverage
- **API Compliance**: RESTful API design standards
- **Image Performance**: Optimized image delivery

## Implementation Notes

### File Structure
```
src/modules/products/
├── products.module.ts          # Main products module
├── products.controller.ts      # Products controller
├── products.service.ts         # Products service
├── admin-products.controller.ts # Admin products controller
├── dto/
│   ├── create-product.dto.ts   # Create product DTO
│   ├── update-product.dto.ts   # Update product DTO
│   ├── product-query.dto.ts    # Product query DTO
│   └── product-variant.dto.ts  # Product variant DTO
├── services/
│   ├── image-upload.service.ts # Image upload service
│   └── search.service.ts       # Search service
└── products.module.spec.ts     # Unit tests
```

### Database Schema
```prisma
model Product {
  id           String   @id @default(cuid())
  title        String
  slug         String   @unique
  description  String
  defaultPrice Decimal  @db.Decimal(10, 2)
  categoryId   String
  images       String[]
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  category  Category        @relation(fields: [categoryId], references: [id])
  variants  ProductVariant[]
  reviews   Review[]

  @@map("products")
  @@index([slug])
  @@index([categoryId])
  @@index([isActive])
}

model ProductVariant {
  id             String  @id @default(cuid())
  productId      String
  sku            String  @unique
  size           String
  color          String
  price          Decimal @db.Decimal(10, 2)
  inventoryCount Int     @default(0)
  isActive       Boolean @default(true)

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@map("product_variants")
  @@index([productId])
  @@index([sku])
}
```

### Image Upload Implementation
```typescript
@Injectable()
export class ImageUploadService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadProductImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const key = `products/${fileName}`;
    
    const uploadResult = await this.s3Service.uploadFile(file.buffer, key, file.mimetype);
    
    return uploadResult.Location;
  }

  async deleteProductImage(imageUrl: string): Promise<void> {
    const key = this.extractKeyFromUrl(imageUrl);
    await this.s3Service.deleteFile(key);
  }
}
```

## Open Questions

1. **Image Storage**: Should we use AWS S3 or a different storage solution?
2. **Search Engine**: Should we implement Elasticsearch for advanced search?
3. **Image Processing**: Should we use a service like Cloudinary for image optimization?
4. **Caching**: Should we implement Redis for product data caching?
5. **Analytics**: What product metrics should we track for analytics?

## Acceptance Criteria

- [ ] Product CRUD endpoints work correctly
- [ ] Product listing with filtering and pagination works
- [ ] Product search functionality works
- [ ] Image upload and management works with S3
- [ ] Product variants are managed correctly
- [ ] Category management works
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all product operations
- [ ] Performance meets specified benchmarks
- [ ] API documentation is complete and accurate
