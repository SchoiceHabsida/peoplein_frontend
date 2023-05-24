export const metadata = {
  title: 'Dashboard | Peoplein',
  description: 'Hire motivated foreign developers',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>HEADER</div>
      <div>SIDEBAR</div>
      <div>NAVIGATION</div>
      {children}
    </div>
  )
}
