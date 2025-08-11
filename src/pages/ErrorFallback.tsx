import { Button } from '@/ui/primitives'

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

export default function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-600 mb-4">
            Xin lỗi, đã có lỗi xảy ra khi tải trang này.
          </p>
          <details className="text-left bg-gray-100 p-4 rounded text-sm text-gray-700 mb-8">
            <summary className="cursor-pointer font-medium mb-2">
              Chi tiết lỗi
            </summary>
            <pre className="whitespace-pre-wrap">{error.message}</pre>
          </details>
        </div>
        
        <div className="space-y-4">
          <Button variant="primary" size="lg" onClick={resetError} className="w-full">
            Thử lại
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}
