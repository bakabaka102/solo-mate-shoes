'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { useCart } from '@/components/providers/CartProvider';

// Mock data for featured products (replace with actual API call)
const mockFeaturedProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Running Sneakers',
    slug: 'premium-running-sneakers',
    description: 'High-performance running shoes with advanced cushioning technology.',
    defaultPrice: 129.99,
    categoryId: '1',
    images: ['/images/products/sneaker-1.jpg'],
    variants: [
      {
        id: '1-1',
        productId: '1',
        sku: 'RUN-001-BLK-10',
        size: '10',
        color: 'Black',
        price: 129.99,
        inventoryCount: 15,
        isActive: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 24,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Classic Leather Boots',
    slug: 'classic-leather-boots',
    description: 'Timeless leather boots crafted from premium materials.',
    defaultPrice: 199.99,
    categoryId: '2',
    images: ['/images/products/boot-1.jpg'],
    variants: [
      {
        id: '2-1',
        productId: '2',
        sku: 'BOOT-001-BRN-9',
        size: '9',
        color: 'Brown',
        price: 199.99,
        inventoryCount: 8,
        isActive: true,
      },
    ],
    averageRating: 4.6,
    reviewCount: 18,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Comfort Sandals',
    slug: 'comfort-sandals',
    description: 'Lightweight and comfortable sandals perfect for summer.',
    defaultPrice: 79.99,
    categoryId: '3',
    images: ['/images/products/sandal-1.jpg'],
    variants: [
      {
        id: '3-1',
        productId: '3',
        sku: 'SAND-001-BLK-8',
        size: '8',
        color: 'Black',
        price: 79.99,
        inventoryCount: 22,
        isActive: true,
      },
    ],
    averageRating: 4.4,
    reviewCount: 12,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Elegant Dress Shoes',
    slug: 'elegant-dress-shoes',
    description: 'Sophisticated dress shoes for formal occasions.',
    defaultPrice: 249.99,
    categoryId: '4',
    images: ['/images/products/dress-1.jpg'],
    variants: [
      {
        id: '4-1',
        productId: '4',
        sku: 'DRESS-001-BLK-10',
        size: '10',
        color: 'Black',
        price: 249.99,
        inventoryCount: 6,
        isActive: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export function FeaturedProducts() {
  const { addItem } = useCart();

  // TODO: Replace with actual API call
  const { data: products = mockFeaturedProducts, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockFeaturedProducts;
    },
  });

  const handleAddToCart = async (product: Product) => {
    const variant = product.variants[0]; // Use first variant for simplicity
    if (variant) {
      try {
        await addItem(variant.id, 1);
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium footwear, 
            featuring the latest styles and best-selling favorites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative h-64 bg-gray-100">
                  {/* Placeholder for product image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm">Product Image</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200">
                    {product.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                {product.averageRating && (
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.averageRating!)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.defaultPrice.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label={`Add ${product.title} to wishlist`}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
