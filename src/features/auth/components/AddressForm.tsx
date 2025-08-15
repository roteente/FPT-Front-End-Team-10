import { useState } from 'react'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { Address } from '@/features/auth/model/types'

interface AddressFormProps {
  onSubmit: (address: Address) => void
  onCancel: () => void
}

export function AddressForm({ onSubmit, onCancel }: AddressFormProps) {
  const { user } = useAuthVM()
  const [formData, setFormData] = useState<Address>({
    street: user?.address?.street || '',
    district: user?.address?.district || '',
    city: user?.address?.city || '',
    addressType: user?.address?.addressType || 'Nhà',
    isDefault: user?.address?.isDefault || true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    const inputValue = isCheckbox ? (e.target as HTMLInputElement).checked : value
    
    setFormData({
      ...formData,
      [name]: inputValue
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Địa chỉ cụ thể
        </label>
        <input
          type="text"
          name="street"
          id="street"
          required
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Số nhà, tên đường"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
          Quận/Huyện
        </label>
        <input
          type="text"
          name="district"
          id="district"
          required
          value={formData.district}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Thành phố/Tỉnh
        </label>
        <input
          type="text"
          name="city"
          id="city"
          required
          value={formData.city}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
          Loại địa chỉ
        </label>
        <select
          name="addressType"
          id="addressType"
          value={formData.addressType}
          onChange={handleInputChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="Nhà">Nhà</option>
          <option value="Công ty">Công ty</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isDefault"
          id="isDefault"
          checked={formData.isDefault}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
          Đặt làm địa chỉ mặc định
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Lưu địa chỉ
        </button>
      </div>
    </form>
  )
}
