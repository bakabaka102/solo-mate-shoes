'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductFilters } from '@/types';

interface FiltersPanelProps {
  filters: ProductFilters;
  onChange: (filters: Partial<ProductFilters>) => void;
}

const categories = [
  { id: 'sneakers', name: 'Sneakers' },
  { id: 'boots', name: 'Boots' },
  { id: 'sandals', name: 'Sandals' },
  { id: 'dress-shoes', name: 'Dress Shoes' },
  { id: 'athletic', name: 'Athletic' },
  { id: 'casual', name: 'Casual' },
];

const sizes = ['6', '7', '8', '9', '10', '11', '12', '13'];
const colors = ['Black', 'White', 'Brown', 'Blue', 'Red', 'Green', 'Gray', 'Navy'];

export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    onChange({ category: categoryId === filters.category ? '' : categoryId });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes?.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...(filters.sizes || []), size];
    onChange({ sizes: newSizes });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors?.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...(filters.colors || []), color];
    onChange({ colors: newColors });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    onChange({ [field]: numValue });
  };

  const clearAllFilters = () => {
    onChange({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      sizes: [],
      colors: [],
      inStock: undefined,
    });
  };

  const hasActiveFilters = filters.category || 
    filters.minPrice || 
    filters.maxPrice || 
    (filters.sizes && filters.sizes.length > 0) || 
    (filters.colors && filters.colors.length > 0) || 
    filters.inStock;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            aria-expanded={expandedSections.category}
          >
            Category
            {expandedSections.category ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            aria-expanded={expandedSections.price}
          >
            Price Range
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.price && (
            <div className="space-y-3">
              <div>
                <label htmlFor="min-price" className="block text-sm text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  id="min-price"
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  placeholder="0"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="block text-sm text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  id="max-price"
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  placeholder="1000"
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div>
          <button
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            aria-expanded={expandedSections.size}
          >
            Size
            {expandedSections.size ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.size && (
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.sizes?.includes(size) || false}
                    onChange={() => handleSizeChange(size)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div>
          <button
            onClick={() => toggleSection('color')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            aria-expanded={expandedSections.color}
          >
            Color
            {expandedSections.color ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.color && (
            <div className="space-y-2">
              {colors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.colors?.includes(color) || false}
                    onChange={() => handleColorChange(color)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div>
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            aria-expanded={expandedSections.availability}
          >
            Availability
            {expandedSections.availability ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.availability && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock || false}
                  onChange={(e) => onChange({ inStock: e.target.checked || undefined })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
