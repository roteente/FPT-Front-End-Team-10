import { Suspense } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { AppRoutes } from '@/core/routing/routes'
import { ProductGridSkeleton } from '@/ui/primitives'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductGridSkeleton />
          </div>
        }>
          <AppRoutes />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}
