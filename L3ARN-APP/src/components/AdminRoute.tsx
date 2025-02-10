// components/AdminRoute.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAdminAccess } from '@/hooks/useAdminAccess'
import { useAccount } from 'wagmi'

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isAdmin } = useAdminAccess()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  if (!isConnected || !isAdmin) {
    return null
  }

  return <>{children}</>
}