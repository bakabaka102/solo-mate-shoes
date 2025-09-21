'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/components/providers/CartProvider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = product.variants[0]; // Use first variant for simplicity
    if (variant) {
      try {
        await addItem(variant.id, 1);
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist:', product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-64 bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
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
          )}
          
          {/* Sale Badge */}
          {product.defaultPrice > 100 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
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
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              ${product.defaultPrice.toFixed(2)}
            </span>
            {product.variants.length > 1 && (
              <span className="text-sm text-gray-500">
                {product.variants.length} variants
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddToCart}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              onClick={handleWishlist}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label={`Add ${product.title} to wishlist`}
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
