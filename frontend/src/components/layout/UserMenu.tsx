'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings, Package, Heart } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { User as UserType } from '@/types';

interface UserMenuProps {
  user: UserType;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { logout } = useAuth();
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    {
      name: 'Profile',
      href: '/account/profile',
      icon: User,
    },
    {
      name: 'Orders',
      href: '/account/orders',
      icon: Package,
    },
    {
      name: 'Wishlist',
      href: '/account/wishlist',
      icon: Heart,
    },
    {
      name: 'Settings',
      href: '/account/settings',
      icon: Settings,
    },
  ];

  // Add admin link if user is admin
  if (user.role === 'admin') {
    menuItems.push({
      name: 'Admin Dashboard',
      href: '/admin',
      icon: Settings,
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
        aria-label={`User menu for ${user.name}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="h-5 w-5 text-primary-600" />
        </div>
        <span className="hidden md:block text-sm font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
          
          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              role="menuitem"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
