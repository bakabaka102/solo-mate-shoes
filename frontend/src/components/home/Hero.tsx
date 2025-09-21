import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Step into
              <span className="block text-primary-200">Comfort & Style</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Discover premium footwear designed with accessibility in mind. 
              Find your perfect pair with our advanced filtering and inclusive shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
            
            {/* Accessibility Features */}
            <div className="mt-12">
              <h2 className="text-lg font-semibold mb-4">Accessibility Features</h2>
              <ul className="text-primary-100 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-200 rounded-full mr-3" aria-hidden="true"></span>
                  Full keyboard navigation support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-200 rounded-full mr-3" aria-hidden="true"></span>
                  Screen reader optimized
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-200 rounded-full mr-3" aria-hidden="true"></span>
                  High contrast mode support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-200 rounded-full mr-3" aria-hidden="true"></span>
                  WCAG 2.1 AA compliant
                </li>
              </ul>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Hero Image</p>
                  <p className="text-sm opacity-75">Premium footwear showcase</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20" aria-hidden="true"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300 rounded-full opacity-20" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
}
