import { useGetCartQuery } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useMemo } from 'react'

export function useCartItemCount() {
  const { user } = useAuthVM()
  const { data: items = [] } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })

  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  return itemCount
}
