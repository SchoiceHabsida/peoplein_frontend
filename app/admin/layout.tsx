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
      <div >
          <AdminHeader/>
          {children}
      </div>
    )
  }
  