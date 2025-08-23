import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { store } from '@/app/store'
import { MainLayout } from '@/ui/layout/MainLayout'
import { AppRoutes } from '@/core/routing/routes'
import { ScrollToTop } from '@/core/utils/ScrollToTop'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải...</p>
            </div>
          </div>
        }>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}

export default App
