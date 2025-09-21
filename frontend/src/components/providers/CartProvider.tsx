'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { api } from '@/lib/api';

interface CartItem {
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

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (productVariantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);

  // Load cart on mount and when user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      // Load guest cart from localStorage
      loadGuestCart();
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const response = await api.get('/cart');
      setItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGuestCart = () => {
    try {
      const savedCart = localStorage.getItem('guest-cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load guest cart:', error);
    }
  };

  const saveGuestCart = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('guest-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save guest cart:', error);
    }
  };

  const addItem = async (productVariantId: string, quantity: number = 1) => {
    if (user) {
      try {
        const response = await api.post('/cart/items', {
          productVariantId,
          quantity,
        });
        setItems(response.data.items);
      } catch (error) {
        throw new Error('Failed to add item to cart');
      }
    } else {
      // Guest cart - add to local state and localStorage
      const newItems = [...items];
      const existingItem = newItems.find(item => item.productVariantId === productVariantId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // For guest cart, we need to fetch product details
        // This is a simplified version - in production, you'd want to cache product data
        newItems.push({
          id: `guest-${Date.now()}`,
          productVariantId,
          product: { id: '', title: 'Loading...', slug: '', images: [] },
          variant: { id: productVariantId, size: '', color: '', price: 0 },
          quantity,
        });
      }
      
      setItems(newItems);
      saveGuestCart(newItems);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    if (user) {
      try {
        const response = await api.put(`/cart/items/${itemId}`, { quantity });
        setItems(response.data.items);
      } catch (error) {
        throw new Error('Failed to update item quantity');
      }
    } else {
      const newItems = items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setItems(newItems);
      saveGuestCart(newItems);
    }
  };

  const removeItem = async (itemId: string) => {
    if (user) {
      try {
        const response = await api.delete(`/cart/items/${itemId}`);
        setItems(response.data.items);
      } catch (error) {
        throw new Error('Failed to remove item from cart');
      }
    } else {
      const newItems = items.filter(item => item.id !== itemId);
      setItems(newItems);
      saveGuestCart(newItems);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await api.delete('/cart');
        setItems([]);
      } catch (error) {
        throw new Error('Failed to clear cart');
      }
    } else {
      setItems([]);
      localStorage.removeItem('guest-cart');
    }
  };

  const syncCart = async () => {
    if (!user || items.length === 0) return;
    
    try {
      // Sync guest cart to server when user logs in
      const guestCart = localStorage.getItem('guest-cart');
      if (guestCart) {
        const guestItems = JSON.parse(guestCart);
        for (const item of guestItems) {
          await api.post('/cart/items', {
            productVariantId: item.productVariantId,
            quantity: item.quantity,
          });
        }
        localStorage.removeItem('guest-cart');
        await loadCart();
      }
    } catch (error) {
      console.error('Failed to sync cart:', error);
    }
  };

  const value = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    syncCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
