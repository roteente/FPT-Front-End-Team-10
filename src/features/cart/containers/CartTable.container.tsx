import { useCartActions } from '../hooks/useCartActions'
import { CartTableUI } from '../ui/CartTableUI'
import { CartItem } from '../model/types'

interface CartTableContainerProps {
  items: CartItem[]
  selectedItems: number[]
  onSelectAll: (checked: boolean) => void
  onSelectItem: (itemId: number, checked: boolean) => void
}

export function CartTableContainer({ 
  items, 
  selectedItems, 
  onSelectAll, 
  onSelectItem 
}: CartTableContainerProps) {
  const { updateQuantity, remove } = useCartActions()

  return (
    <CartTableUI
      items={items}
      selectedItems={selectedItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={remove}
      onSelectAll={onSelectAll}
      onSelectItem={onSelectItem}
    />
  )
}
