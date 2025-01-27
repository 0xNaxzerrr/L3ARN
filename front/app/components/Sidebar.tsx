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
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-2xl font-bold text-white">L3ARN</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className="inline-flex items-center">
                <Icon className={`h-5 w-5 mr-3`} />
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="border-t border-white/10 p-3">
        <button className="
          w-full flex items-center px-4 py-3 text-sm font-medium text-white/80 
          rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200
        ">
          <span className="inline-flex items-center">
            <UserCircle className="h-5 w-5 mr-3" />
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}
