'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { FiltersPanel } from '@/components/products/FiltersPanel';
import { SortDropdown } from '@/components/products/SortDropdown';
import { ProductFilters } from '@/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sizes: searchParams.get('sizes')?.split(',') || [],
    colors: searchParams.get('colors')?.split(',') || [],
    inStock: searchParams.get('inStock') === 'true',
    sortBy: (searchParams.get('sortBy') as ProductFilters['sortBy']) || 'newest',
    page: 1,
    limit: 12,
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleFiltersChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {filters.search ? `Search Results for "${filters.search}"` : 'All Products'}
        </h1>
        <p className="text-gray-600">
          Discover our complete collection of premium footwear
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-8">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="lg:hidden w-full btn-secondary mb-4"
            >
              {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
              <FiltersPanel
                filters={filters}
                onChange={handleFiltersChange}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              {/* TODO: Show actual count from API */}
              Showing 1-12 of 48 products
            </div>
            <SortDropdown
              value={filters.sortBy || 'newest'}
              onChange={(sortBy) => handleFiltersChange({ sortBy })}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* TODO: Replace with actual products from API */}
            {[...Array(12)].map((_, i) => (
              <ProductCard
                key={i}
                product={{
                  id: `${i}`,
                  title: `Product ${i + 1}`,
                  slug: `product-${i + 1}`,
                  description: `Description for product ${i + 1}`,
                  defaultPrice: 99.99 + (i * 10),
                  categoryId: '1',
                  images: [],
                  variants: [{
                    id: `${i}-1`,
                    productId: `${i}`,
                    sku: `SKU-${i}`,
                    size: '10',
                    color: 'Black',
                    price: 99.99 + (i * 10),
                    inventoryCount: 10,
                    isActive: true,
                  }],
                  averageRating: 4.5,
                  reviewCount: 10,
                  isActive: true,
                  createdAt: '2024-01-01T00:00:00Z',
                  updatedAt: '2024-01-01T00:00:00Z',
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
