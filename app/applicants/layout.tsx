import { ApplicantsProvider } from "@/common/components/applicants"
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb"
import { Searchbar } from "../../components/searchbar/Searchbar"
import { SearchProvider } from "@/common/providers"
import { FilterProvider } from "@/common/providers"
import { Sidebar } from "../../components/sidebar"
import { Header } from "../../components/header"

export const metadata = {
  title: 'Applicants | Peoplein',
  description: 'Hire motivated foreign developers',
}

export default function ApplicantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <Header />
      <SearchProvider>
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
      </SearchProvider>
    </div>
  )
}
