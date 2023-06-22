'use client'
import { ArrowRight } from "@/common/icons/ArrowRight"
import { AdminCvActions } from "../admin-cv-actions/AdminCvActions"
import { ActionButtonWrapper, AdminStatusActions } from "../admin-status-actions/AdminStatusActions"

import './styles.css';
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useQuery } from "@apollo/client";
import { IApplicant } from "@/common/components/models/applicants.model";
import { GET_APPLICANT_BY_ID } from "@/app/applicants/[applicantPage]/[id]/query";

export const ApplicantDetails: FC<{ applicantId: string }> = ({ applicantId }) => {
    const { data, loading } = useQuery<{ 'getApplicantById': IApplicant }>(GET_APPLICANT_BY_ID,
        { variables: { id: applicantId }, fetchPolicy: 'no-cache' })

    const path = usePathname();
    const router = useRouter();

    return <div className="flex flex-col gap-6 applicant-details">
        <div className="flex">
            <div>
                <img src={data?.getApplicantById.profilePicture ? data?.getApplicantById.profilePicture?.path : '/Avatar-Image.png'}
                    width={205}
                    style={{ height: '205px' }}
                    className='rounded' alt='person'></img>
            </div>
            <div className="right-actions flex flex-col flex-grow items-end justify-center gap-2 pr-6">
                <AdminStatusActions />
                <AdminCvActions />
                <ActionButtonWrapper
                    onCLick={() => router.push(`${path}/${applicantId}`)}
                    label={'Edit account'}
                    icon={<ArrowRight></ArrowRight>} />
            </div>
        </div>
        <div className="flex gap-2">
            <div className="w-2/3">
                <div className="mb-14">
                    <div className="applicant-name">{data?.getApplicantById.firstName} {data?.getApplicantById.lastName}</div>
                    <div>
                        {data?.getApplicantById.specialization?.map((spc, index) => (<span key={index}>{spc}</span>))}
                    </div>
                </div>
                <div>
                    <div className="sub-title">Description:</div>

                    <div className="section">About</div>
                    <div className="sub-title-1 mb-6">Degree: {data?.getApplicantById?.degree}</div>
                    {/* <div className="mb-6">
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                        <div>+ 2021 DEC UTAC SPOT AWARD</div>
                    </div> */}
                    {
                        data?.getApplicantById.experience?.map((experience, index) => {
                            return <div key={index}>
                                <div className="sub-title-1">{experience.company}</div>
                                <div className="mb-6">{experience.yearsWorked} + years</div>

                                <div className="section mb-6">Background Details</div>
                                <div>{experience.details}</div>
                            </div>
                        })
                    }
                    {/* <div className="sub-title-1">Experience in Singapore Semiconductor Industry:</div>
                    <div className="mb-6">6 + years</div>
                    <div className="sub-title-1">Domain Knowledge:</div>
                    <div className="mb-6">
                        Mixed Signal Logic Products(MSLP):
                        * Final Test
                        * Wafer Sort
                        * Assembly
                    </div> */}
                    {/* <div className="sub-title-1">Experience in Software Development:</div>
                    <div className="mb-6">8 + years</div>

                    <div className="section mb-6">Background Details</div>

                    <div className="sub-title-1">Position:</div>
                    <div>My latest position is Software Engineer in UTAC(Singapore).</div> */}

                    <div className="sub-title-1">Certificates:</div>
                    <div className="mb-6">
                        {data?.getApplicantById.certificates.map((certificate, index) => <div key={index}> - {certificate.certificateName}</div>)}
                    </div>

                    {/* <div className="sub-title-1">Experience in Semiconductor Industry:</div>
                    <div className="mb-6">6 + years Experience in Semiconductor Industry with MSLP Domain knowledge.</div>

                    <div className="sub-title-1">Experience in Software Development:</div>
                    <div className="mb-6">8 + years experience in Software development with full SDLC(Waterfall model, Agile).</div> */}

                    <div className="sub-title-1">Skills:</div>
                    <div className="mb-6">
                        {data?.getApplicantById?.skills?.map((skill, index) => <div key={index}> - {skill.skillName}</div>)}
                    </div>

                    <div className="sub-title-1">Others:</div>
                    <div className="mb-6">
                        {data?.getApplicantById?.description}
                    </div>

                    Best Regards <br />
                    PM
                </div>
            </div>
            <div className="w-1/3">
                <div className="sub-title">
                    Nationality:
                </div>
                <div className="mb-6">{data?.getApplicantById.country}</div>
                <div className="sub-title">
                    Visa:
                </div>
                <div className="mb-6">{data?.getApplicantById.visa}</div>
                <div className="sub-title">
                    Email:
                </div>
                <div className="mb-6">{data?.getApplicantById.email}</div>
                {/* <div className="sub-title">
                    In favorites:
                </div>
                <div>1) Company A</div>
                <div>2) Comapny B</div> */}
            </div>
        </div>
    </div>
}







