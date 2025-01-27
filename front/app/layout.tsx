import { Inter } from 'next/font/google'
import './globals.css'
import { WagmiConfig } from '@/components/providers/wagmi'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              {children}
            </div>
          </div>
        </WagmiConfig>
      </body>
    </html>
  )
}
