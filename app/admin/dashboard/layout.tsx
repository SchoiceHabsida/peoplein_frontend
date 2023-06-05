import { AdminSidebar } from "@/components/admin-sidebar"

export const metadata = {
  title: 'Admin | Peoplein',
  description: 'Hire motivated foreign developers',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const styles = {
    content: {
      height: 'calc(100vh - 100px)'
    },
    sidebarWrapper: {
      width: '320px',
      borderRight: '1px solid #A2A2A2'
    },
  }

  return (
    <div className="">
          <div className="flex" style={styles.content}>
            <div style={styles.sidebarWrapper}>
              <AdminSidebar/>
            </div>
            <div className="grow">
            {children}
            </div>
          </div>
    </div>
  )
}