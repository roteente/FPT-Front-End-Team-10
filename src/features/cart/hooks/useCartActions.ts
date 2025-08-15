import { useUpdateCartItemMutation, useRemoveCartItemMutation, useGetCartQuery } from '../api/cartApi'
import { useAppDispatch } from '@/app/hooks'
import { baseApi } from '@/core/api/baseApi'
import { useState } from 'react'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { CartItem } from '../model/types'

// Define an interface for tracking optimistic updates
interface OptimisticUpdate {
  id: number;
  quantity: number;
}

export function useCartActions() {
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation()
  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation()
  const dispatch = useAppDispatch()
  const [optimisticIds, setOptimisticIds] = useState<number[]>([])
  // Track optimistic quantity updates
  const [optimisticUpdates, setOptimisticUpdates] = useState<OptimisticUpdate[]>([])
  const { user } = useAuthVM()
  
  // Get the refetch function from the cart query
  // We don't need the data here, just the refetch capability
  const { refetch: refetchCart } = useGetCartQuery(user?.id, {
    skip: !user?.id,
    // We're just accessing the refetch function, not the data
  })

  // Function to get the optimistically updated quantity for an item
  const getOptimisticQuantity = (item: CartItem): number => {
    const update = optimisticUpdates.find(u => u.id === item.id)
    return update ? update.quantity : item.quantity
  }

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        // Apply optimistic update first
        setOptimisticUpdates(prev => {
          // Remove any existing update for this item
          const filtered = prev.filter(u => u.id !== id)
          // Add the new update
          return [...filtered, { id, quantity }]
        })
        
        // Update the item in the background
        await updateItem({ id, quantity }).unwrap()
        
        // Force update of all cart-related queries
        dispatch(baseApi.util.invalidateTags([{ type: 'Cart', id: 'LIST' }]))
        
        // Clear optimistic update for this item
        setOptimisticUpdates(prev => prev.filter(u => u.id !== id))
        
        // Explicitly refetch cart data
        refetchCart()
      } catch (error) {
        console.error('Failed to update item quantity:', error)
        // Remove the optimistic update if the operation failed
        setOptimisticUpdates(prev => prev.filter(u => u.id !== id))
      }
    } else {
      // Handle removal through the remove function
      remove(id)
    }
  }

  const remove = async (id: number) => {
    try {
      // Optimistically mark the item as removed
      setOptimisticIds(prev => [...prev, id])
      
      // Actually remove the item
      await removeItem(id).unwrap()
      
      // Force update of all cart-related queries
      dispatch(baseApi.util.invalidateTags([{ type: 'Cart', id: 'LIST' }]))
      
      // Explicitly refetch cart data
      refetchCart()
    } catch (error) {
      console.error('Failed to remove item:', error)
      // Remove the ID from optimistic removals if the operation failed
      setOptimisticIds(prev => prev.filter(itemId => itemId !== id))
    }
  }

  return { 
    updateQuantity, 
    remove, 
    isUpdating, 
    isRemoving,
    optimisticIds,
    getOptimisticQuantity,
    optimisticUpdates
  }
}
