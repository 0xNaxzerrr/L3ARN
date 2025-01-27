"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, GraduationCap, CheckCircle, ShieldCheck } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: GraduationCap, label: "My Certificates", href: "/student" },
  { icon: CheckCircle, label: "Verify", href: "/verify" },
  { icon: ShieldCheck, label: "Admin", href: "/admin" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 gradient-bg text-white shadow-xl">
      <div className="flex items-center justify-center h-16 border-b border-white border-opacity-20">
        <span className="text-2xl font-bold">L3ARN</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${
                  pathname === item.href ? "nav-link-active" : "text-white text-opacity-80 nav-link-hover"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white border-opacity-20">
        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm"
          />
          <div>
            <span className="text-sm font-medium block">John Doe</span>
            <span className="text-xs text-white text-opacity-80">Student</span>
          </div>
        </div>
      </div>
    </div>
  )
}

