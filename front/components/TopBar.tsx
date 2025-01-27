import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function TopBar() {
  return (
    <header className="bg-white bg-opacity-90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 input-clear" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="outline">Connect Wallet</Button>
        </div>
      </div>
    </header>
  )
}

