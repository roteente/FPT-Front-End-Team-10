import { useSearchParams } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Kết quả tìm kiếm{query && `: "${query}"`}
      </h1>
      <p className="text-gray-600">
        Trang tìm kiếm sẽ được implement sau.
      </p>
    </div>
  )
}
