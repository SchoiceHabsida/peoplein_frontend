'use client'
import { ArrowRight } from "@/common/icons/ArrowRight"
import { ActionButtonWrapper } from "../admin-status-actions/AdminStatusActions"

import './styles.css';
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

export const CompanyDetails: FC<{id: string}> = ({id}) => {

    const mock_id = '1';
    const path = usePathname();
    const router = useRouter();

    return <div className="flex flex-col gap-6 applicant-details">
        <div className="flex">
            <div className="flex items-center justify-center company-logo">
                logo
            </div>
            <div className="right-actions flex flex-col flex-grow items-end justify-center gap-2 pr-6">

                <ActionButtonWrapper
                    onCLick={() => router.push(`${path}/${mock_id}`)}
                    label={'Edit company'}
                    icon={<ArrowRight></ArrowRight>} />
            </div>
        </div>
        <div className="flex gap-2">
            <div className="w-2/3">
                <div className="mb-14">
                    <div className="applicant-name">Company</div>
                    <div>Registration number</div>
                </div>
            </div>
            <div className="w-1/3">
                <div className="sub-title">
                    Skills:
                </div>
                <div className="mb-6">
                    Java, JS, React</div>
                <div className="sub-title">
                    Email:
                </div>
                <div className="mb-6">main@mail.com</div>
                <div className="sub-title">
                    Contact number:
                </div>
                <div className="mb-6">010 1234 5566 78</div>
                <div className="sub-title">
                    In favorites:
                </div>
                <div>1) Name A</div>
                <div>2) Name B</div>
            </div>
        </div>
    </div>
}







