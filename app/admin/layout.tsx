import { AdminFiltersProvider } from "@/common/providers"
import { AdminHeader } from "@/components/admin-header"

export const metadata = {
  title: 'Admin | Peoplein',
  description: 'Hire motivated foreign developers',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminFiltersProvider>
      <div >
        <AdminHeader />
        {children}
      </div>
    </AdminFiltersProvider>
  )
}
