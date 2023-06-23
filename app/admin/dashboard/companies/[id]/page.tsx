'use client'

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";

import '../add/styles.css'
import { CompanyForm } from "../CompanyForm";

export default function EditApplicant({ params }: { params: { id: string } }) {
    return <div className="people">
        <ContentHeader label="Edit Company">
            <Breadcrumb with_bg={false} />
        </ContentHeader>
        <CompanyForm/>
    </div>
}
