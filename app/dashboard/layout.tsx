import { ApplicantsProvider } from "@/common/components/applicants"
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb"
import { Header } from "../../components/header"
import { Searchbar } from "../../components/searchbar/Searchbar"
import { Sidebar } from "../../components/sidebar"
import { FilterProvider } from "@/common/providers/Filter.provider"

export const metadata = {
  title: 'Applicants | Peoplein',
  description: 'Hire motivated foreign developers',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <Header />
      <FilterProvider>
        <div className="content-x-space flex gap-9">
          <div className="w-1/3">
            <Sidebar />
          </div>
          <div className="w-2/3">
            <div><Breadcrumb /></div>
            <div><Searchbar /></div>
            <ApplicantsProvider>
              {children}
            </ApplicantsProvider>
          </div>
        </div>
      </FilterProvider>
    </div>
  )
}
