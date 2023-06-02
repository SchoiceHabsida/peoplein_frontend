import { AdminFilters } from "@/components/admin-filters";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";

export default function People() {
    return <div className="people">
        <ContentHeader label="People list">
            <Breadcrumb with_bg={false}/>
            <AdminFilters/>
        </ContentHeader>
        list
    </div>
  }
  