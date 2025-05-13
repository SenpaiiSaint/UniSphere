import { Suspense } from 'react'
import { MainLayout } from './components/Layout/MainLayout'
import type { Metadata, Viewport } from 'next'
import DynamicDashboard from './components/Dashboard/DynamicDashboard'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Professor Dashboard',
  description: 'Comprehensive dashboard for managing courses, student performance, and academic analytics.',
  robots: 'index, follow',
  openGraph: {
    title: 'Professor Dashboard',
    description: 'Comprehensive dashboard for managing courses, student performance, and academic analytics.',
    type: 'website',
  },
}

// Loading component for the main content
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse space-y-4 w-full max-w-7xl mx-auto p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="col-span-4 space-y-4">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-[1920px] mx-auto">
        <Suspense fallback={<LoadingFallback />}>
          <DynamicDashboard />
        </Suspense>
      </div>
    </MainLayout>
  )
}
