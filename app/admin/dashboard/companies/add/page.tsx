import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";

import './styles.css'
import { CompanyForm } from "../CompanyForm";

export default function Add() {
    
    return <div className="people">
        <ContentHeader label="Add Company">
            <Breadcrumb with_bg={false} />
        </ContentHeader>

        <CompanyForm/>
    </div>
}
