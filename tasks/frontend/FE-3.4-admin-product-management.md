# PRD: Admin Product Management Table (FE-3.4)

## Component/Feature Overview

**Component Name**: Admin Product Management Table  
**Problem Solved**: Provides comprehensive product management interface for administrators to create, edit, and manage products  
**Main Goal**: Implement accessible product management table with CRUD operations, image upload, and advanced filtering while maintaining WCAG 2.1 AA accessibility compliance  
**Component Hierarchy**: `/app/admin/products/page.tsx` - Admin product management page with table and forms

## Technical Specifications

**Component Type**: Next.js Page Component with Table and Forms  
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
- `react-table` for table functionality

## User Stories

**US-1**: As an admin, I want to view all products in a table so I can manage them efficiently  
**US-2**: As an admin, I want to create new products so I can expand the catalog  
**US-3**: As an admin, I want to edit existing products so I can keep information up to date  
**US-4**: As an admin with disabilities, I want to use the product management interface with keyboard navigation so I can access all features  
**US-5**: As an admin, I want to upload product images so I can showcase products effectively  
**US-6**: As an admin, I want to filter and search products so I can find specific items quickly

## Functional Requirements

### FR-1: Product Table Display
- **FR-1.1**: Display products in an accessible, sortable table
- **FR-1.2**: Show product images, titles, prices, and status
- **FR-1.3**: Implement table pagination for large product sets
- **FR-1.4**: Display product categories and variants
- **FR-1.5**: Show product creation and update dates
- **FR-1.6**: Display product inventory levels

### FR-2: Product Table Actions
- **FR-2.1**: Implement edit product functionality
- **FR-2.2**: Add delete product functionality with confirmation
- **FR-2.3**: Support bulk product operations
- **FR-2.4**: Implement product status toggling
- **FR-2.5**: Add product duplication functionality
- **FR-2.6**: Support product export functionality

### FR-3: Product Creation Form
- **FR-3.1**: Create accessible product creation form
- **FR-3.2**: Implement product basic information fields
- **FR-3.3**: Add product description and specifications
- **FR-3.4**: Support product category selection
- **FR-3.5**: Implement product variant management
- **FR-3.6**: Add product image upload functionality

### FR-4: Product Editing Form
- **FR-4.1**: Create accessible product editing form
- **FR-4.2**: Pre-populate form with existing product data
- **FR-4.3**: Support product information updates
- **FR-4.4**: Implement product variant editing
- **FR-4.5**: Support product image management
- **FR-4.6**: Add product status management

### FR-5: Product Filtering and Search
- **FR-5.1**: Implement product search functionality
- **FR-5.2**: Add product category filtering
- **FR-5.3**: Support product status filtering
- **FR-5.4**: Implement price range filtering
- **FR-5.5**: Add product date range filtering
- **FR-5.6**: Support advanced product filtering

### FR-6: Image Upload and Management
- **FR-6.1**: Implement product image upload functionality
- **FR-6.2**: Support multiple image formats (JPEG, PNG, WebP)
- **FR-6.3**: Add image preview and management
- **FR-6.4**: Support image ordering and primary image selection
- **FR-6.5**: Implement image deletion functionality
- **FR-6.6**: Add image optimization and resizing

### FR-7: Accessibility Features
- **FR-7.1**: Implement proper ARIA labels for all interactive elements
- **FR-7.2**: Ensure keyboard navigation works throughout the interface
- **FR-7.3**: Provide focus management for forms and tables
- **FR-7.4**: Support screen reader announcements for dynamic content
- **FR-7.5**: Use semantic HTML structure with proper headings
- **FR-7.6**: Implement skip links for main content

## Component API Design

### Props Interface
```typescript
interface AdminProductManagementProps {
  // No props needed - this is a page component
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
  loading?: boolean;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}
```

### Product Data Structure
```typescript
interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  defaultPrice: number;
  categoryId: string;
  images: string[];
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface ProductFormData {
  title: string;
  description: string;
  defaultPrice: number;
  categoryId: string;
  images: string[];
  variants: ProductVariantFormData[];
  isActive: boolean;
}

interface ProductVariantFormData {
  size: string;
  color: string;
  price: number;
  inventoryCount: number;
  isActive: boolean;
}
```

### Form Schema
```typescript
const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  defaultPrice: z.number().min(0, 'Price must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  variants: z.array(z.object({
    size: z.string().min(1, 'Size is required'),
    color: z.string().min(1, 'Color is required'),
    price: z.number().min(0, 'Price must be positive'),
    inventoryCount: z.number().min(0, 'Inventory count must be non-negative'),
    isActive: z.boolean(),
  })),
  isActive: z.boolean(),
});
```

## UI/UX Requirements

### Visual Design
- **Design System**: Follow SoleMate brand colors and typography
- **Layout**: Clean, organized product management layout
- **Table**: Professional, accessible data table with proper spacing
- **Forms**: Clean, accessible forms with clear field organization
- **Images**: Well-organized image upload and management interface
- **Loading States**: Skeleton screens and loading indicators

### Responsive Behavior
- **Mobile**: Responsive table with horizontal scrolling
- **Tablet**: Optimized layout with appropriate spacing
- **Desktop**: Full layout with sidebar and main content area
- **Touch Targets**: Minimum 44px touch targets for mobile

### Accessibility Compliance
- **WCAG 2.1 AA**: Full compliance required
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Screen Reader**: Proper semantic HTML and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility

## Integration Requirements

### Parent Component Integration
- **Admin Layout**: Integrate with admin layout and navigation
- **Router**: Use Next.js router for navigation
- **SEO**: Implement proper meta tags and structured data

### Global State Management
- **Admin Context**: Integrate with admin context for permissions
- **Product Context**: Manage product state across components
- **Form Context**: Handle form state and validation

### API Integration
- **Endpoints**: 
  - `GET /api/admin/products` - Get all products
  - `POST /api/admin/products` - Create new product
  - `PUT /api/admin/products/:id` - Update product
  - `DELETE /api/admin/products/:id` - Delete product
  - `POST /api/admin/products/upload-image` - Upload product image
- **Error Handling**: Display appropriate error messages
- **Loading States**: Show loading indicators during API calls

## Non-Goals (Out of Scope)

- Advanced product analytics
- Product import/export functionality
- Advanced product customization
- Product versioning
- Advanced inventory management
- Product recommendation engine

## Testing Requirements

### Unit Testing
- **Component Rendering**: Test product management components render correctly
- **Table Functionality**: Test table sorting, filtering, and pagination
- **Form Validation**: Test product form validation
- **Accessibility**: Test ARIA attributes and keyboard navigation
- **State Management**: Test product state updates

### Integration Testing
- **API Integration**: Test product CRUD operations
- **Image Upload**: Test image upload functionality
- **Form Submission**: Test product creation and editing
- **Error Handling**: Test error scenarios and recovery

### E2E Testing
- **Complete Flow**: Test complete product management experience
- **Accessibility**: Test with screen reader and keyboard only
- **Mobile**: Test responsive behavior on mobile devices
- **Performance**: Test product management performance

## Performance Considerations

- **Table Performance**: Optimize table rendering for large datasets
- **Image Upload**: Optimize image upload and processing
- **Form Performance**: Optimize form rendering and validation
- **API Calls**: Minimize redundant API calls
- **Bundle Size**: Minimize JavaScript bundle size

## Success Metrics

- **Accessibility Score**: 100% WCAG 2.1 AA compliance
- **Performance**: Product table loading under 2 seconds
- **User Experience**: Intuitive product management interface
- **Code Quality**: 90%+ test coverage
- **Admin Efficiency**: High product management task completion rates

## Implementation Notes

### File Structure
```
src/app/admin/products/
├── page.tsx                    # Main product management page
├── components/
│   ├── ProductTable.tsx        # Product data table
│   ├── ProductForm.tsx         # Product creation/editing form
│   ├── ProductImageUpload.tsx  # Image upload component
│   ├── ProductVariantForm.tsx  # Product variant form
│   ├── ProductFilters.tsx      # Product filtering controls
│   └── ProductActions.tsx      # Product action buttons
├── hooks/
│   ├── useProducts.ts          # Product data fetching
│   ├── useProductForm.ts       # Product form logic
│   └── useImageUpload.ts       # Image upload logic
└── types/
    └── product.types.ts        # TypeScript interfaces
```

### Product Table Implementation
```typescript
const ProductTable = ({ products, onEdit, onDelete, onToggleStatus, loading }: ProductTableProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'images',
        Cell: ({ value }: { value: string[] }) => (
          <div className="w-16 h-16">
            <Image
              src={value[0] || '/placeholder-image.jpg'}
              alt="Product image"
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
          </div>
        ),
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value, row }: { value: string; row: any }) => (
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.original.slug}</p>
          </div>
        ),
      },
      {
        Header: 'Category',
        accessor: 'category.name',
      },
      {
        Header: 'Price',
        accessor: 'defaultPrice',
        Cell: ({ value }: { value: number }) => (
          <span className="font-medium">${value.toFixed(2)}</span>
        ),
      },
      {
        Header: 'Status',
        accessor: 'isActive',
        Cell: ({ value, row }: { value: boolean; row: any }) => (
          <button
            onClick={() => onToggleStatus(row.original)}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
            aria-label={`Toggle product status to ${value ? 'inactive' : 'active'}`}
          >
            {value ? 'Active' : 'Inactive'}
          </button>
        ),
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }: { row: any }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(row.original)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label={`Edit product ${row.original.title}`}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(row.original)}
              className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label={`Delete product ${row.original.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onToggleStatus]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: products });

  if (loading) {
    return <ProductTableSkeleton />;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
          role="table"
          aria-label="Products table"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

### Product Form Implementation
```typescript
const ProductForm = ({ product, onSubmit, onCancel, loading }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      title: '',
      description: '',
      defaultPrice: 0,
      categoryId: '',
      images: [],
      variants: [],
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Product Title *
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Default Price *
          </label>
          <input
            {...register('defaultPrice', { valueAsNumber: true })}
            type="number"
            step="0.01"
            id="defaultPrice"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby={errors.defaultPrice ? 'price-error' : undefined}
          />
          {errors.defaultPrice && (
            <p id="price-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.defaultPrice.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <ProductImageUpload
        images={watch('images')}
        onImagesChange={(images) => setValue('images', images)}
        error={errors.images?.message}
      />

      <ProductVariantForm
        variants={fields}
        onVariantsChange={(variants) => setValue('variants', variants)}
        onAddVariant={() => append({ size: '', color: '', price: 0, inventoryCount: 0, isActive: true })}
        onRemoveVariant={remove}
        errors={errors.variants}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};
```

## Open Questions

1. **Bulk Operations**: Should we implement bulk product operations?
2. **Product Import**: Should we support product import from CSV/Excel?
3. **Product Templates**: Should we provide product templates for common types?
4. **Product Analytics**: What product management metrics should we track?
5. **Product Versioning**: Should we implement product versioning for changes?

## Acceptance Criteria

- [ ] Product table displays all products with proper sorting and filtering
- [ ] Product creation form works with proper validation
- [ ] Product editing form works with pre-populated data
- [ ] Image upload functionality works correctly
- [ ] Product variant management works correctly
- [ ] Accessibility requirements are met (WCAG 2.1 AA)
- [ ] Responsive design works on all device sizes
- [ ] Unit tests achieve 90%+ coverage
- [ ] E2E tests pass for complete product management experience
- [ ] Performance meets specified benchmarks
- [ ] Product CRUD operations work correctly
