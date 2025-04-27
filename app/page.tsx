import { MainLayout } from './components/Layout/MainLayout'
import { Dashboard } from './components/Dashboard/Dashboard'

export default function Home() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  )
}
