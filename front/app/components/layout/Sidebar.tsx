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
    <div className="flex flex-col w-64 bg-card text-card-foreground border-r border-border">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="text-2xl font-bold text-foreground">L3ARN</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary hover:bg-primary/15'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="border-t border-border p-4">
        <button className="flex items-center px-4 py-3 w-full text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground">
          <UserCircle className="h-5 w-5 mr-3" />
          Profile
        </button>
      </div>
    </div>
  );
}
