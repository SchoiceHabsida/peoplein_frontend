import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";

import './styles.css'
import { ApplicantForm } from "../ApplicantForm";

export default function Add() {
    
    return <div className="people">
        <ContentHeader label="Add User">
            <Breadcrumb with_bg={false} />
        </ContentHeader>

        <ApplicantForm/>
    </div>
}
