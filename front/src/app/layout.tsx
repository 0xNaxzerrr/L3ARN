import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Modal } from '../components/Web3Modal'
import { Sidebar } from '../components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              {children}
            </div>
          </div>
        </Web3Modal>
      </body>
    </html>
  )
}
