// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  defaultPrice: number;
  categoryId: string;
  category?: Category;
  images: string[];
  variants: ProductVariant[];
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  inventoryCount: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
}

// Cart types
export interface CartItem {
  id: string;
  productVariantId: string;
  product: {
    id: string;
    title: string;
    slug: string;
    images: string[];
  };
  variant: {
    id: string;
    size: string;
    color: string;
    price: number;
  };
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  user?: User;
  totalAmount: number;
  status: OrderStatus;
  paymentProvider: 'paypal' | 'stripe';
  paymentRef: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  productVariant: ProductVariant;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// Review types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: User;
  rating: number;
  title?: string;
  body?: string;
  isModerated: boolean;
  createdAt: string;
  updatedAt: string;
}

// Promotion types
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  expiresAt?: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and Filter types
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutForm {
  shippingAddress: Address;
  billingAddress: Address;
  useSameAddress: boolean;
  shippingMethod: string;
  couponCode?: string;
}

// PayPal types
export interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

// Analytics types
export interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  ordersByDay: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
  topProducts: Array<{
    product: Product;
    sales: number;
    revenue: number;
  }>;
}
