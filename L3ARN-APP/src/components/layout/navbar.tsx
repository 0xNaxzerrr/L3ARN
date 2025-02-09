"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'My Certificates', href: '/certificates' },
    { label: 'Verify', href: '/verify' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            L3ARN
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <Button
            variant="outline"
            className="hidden md:block"
            onClick={() => console.log('Connect wallet clicked')}
          >
            Connect Wallet
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu (can be expanded with state management) */}
        <div className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => console.log('Connect wallet clicked')}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
