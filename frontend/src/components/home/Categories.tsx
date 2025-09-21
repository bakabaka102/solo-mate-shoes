import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: '1',
    name: 'Sneakers',
    slug: 'sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear',
    image: '/images/categories/sneakers.jpg',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Boots',
    slug: 'boots',
    description: 'Durable boots for all seasons and occasions',
    image: '/images/categories/boots.jpg',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Sandals',
    slug: 'sandals',
    description: 'Lightweight sandals perfect for warm weather',
    image: '/images/categories/sandals.jpg',
    productCount: 15,
  },
  {
    id: '4',
    name: 'Dress Shoes',
    slug: 'dress-shoes',
    description: 'Elegant dress shoes for formal occasions',
    image: '/images/categories/dress-shoes.jpg',
    productCount: 12,
  },
  {
    id: '5',
    name: 'Athletic',
    slug: 'athletic',
    description: 'Performance footwear for sports and fitness',
    image: '/images/categories/athletic.jpg',
    productCount: 20,
  },
  {
    id: '6',
    name: 'Casual',
    slug: 'casual',
    description: 'Relaxed and comfortable casual footwear',
    image: '/images/categories/casual.jpg',
    productCount: 16,
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-white" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collection of footwear categories, 
            each designed to meet your specific needs and style preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-100">
                {/* Placeholder for category image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center text-primary-600">
                    <div className="w-16 h-16 mx-auto mb-2 bg-primary-300 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{category.name}</p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.productCount} products
                  </span>
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
