'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GraduationCap, Search, Settings, UserCircle } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'My Certificates', href: '/student', icon: GraduationCap },
  { name: 'Verify', href: '/verify', icon: Search },
  { name: 'Admin', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gradient-to-b from-blue-600 to-purple-600">
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <span className="text-2xl font-bold text-white">L3ARN</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-10 items-center gap-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="px-4 py-4">
        <button className="flex h-10 w-full items-center gap-3 px-4 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200">
          <UserCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
