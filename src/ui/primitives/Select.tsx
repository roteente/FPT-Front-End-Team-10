import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/core/utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options?: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options = [], children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'form-input',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {children || options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
