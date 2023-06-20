'use client'
import { ArrowRight } from "@/common/icons/ArrowRight"
import { ActionButtonWrapper } from "../admin-status-actions/AdminStatusActions"

import './styles.css';
import { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { ICompany } from "@/common/components/models/companies.model";

export const GET_COMPANY_QUERY = gql`
query getCompany ($id: ID!) {
    getCompanyById (id: $id) {
        id
        name
        address 
        hrManager
        email
        phoneNumber
        website
        foundedAt
        registrationNumber
        favoriteApplicants {
            firstName
            lastName
        }
        requiredSkills {
            skillName,
            skillType
        }
        preferredVisas,
        logo {
            id
            type
            path
        }
        banner {
            id
            type
            path
        }
    }
}
`

export const CompanyDetails: FC<{ id: string }> = ({ id }) => {
    const { data, loading } = useQuery<{ 'getCompanyById': ICompany }>(GET_COMPANY_QUERY, { variables: { id: id }, fetchPolicy: 'no-cache' })
    const path = usePathname();
    const router = useRouter();

    return <div className="flex flex-col gap-6 applicant-details">
        <div className="flex">
            {
                data?.getCompanyById.logo ?
                    <img src={data?.getCompanyById.logo?.path}
                        width={205}
                        style={{height: '205px'}}
                        className='rounded' alt='person'></img> : <div
                            className="flex items-center justify-center company-logo">
                        logo
                    </div>
            }

            <div className="right-actions flex flex-col flex-grow items-end justify-center gap-2 pr-6" 
            style={{
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${data?.getCompanyById.banner?.path})`}}>

                <ActionButtonWrapper
                    onCLick={() => router.push(`${path}/${id}`)}
                    label={'Edit company'}
                    icon={<ArrowRight></ArrowRight>} />
            </div>
        </div>
        <div className="flex gap-2">
            <div className="w-2/3">
                <div className="mb-14">
                    <div className="applicant-name">{data?.getCompanyById.name}</div>
                    <div>Registration number</div>
                </div>
            </div>
            <div className="w-1/3">
                <div className="sub-title">
                    Skills:
                </div>
                {
                    data?.getCompanyById.requiredSkills?.map((skill, index) => <div key={index}> {skill.skillName} , </div>)
                }
                <div className="mb-6">
                </div>
                <div className="sub-title">
                    Email:
                </div>
                <div className="mb-6">{data?.getCompanyById?.email}</div>
                <div className="sub-title">
                    Contact number:
                </div>
                <div className="mb-6">{data?.getCompanyById?.phoneNumber}</div>
                <div className="sub-title">
                    Favorite user:
                </div>
                {data?.getCompanyById.favoriteApplicants?.map((applicant, index) => <div key={index}>{index + 1}) {applicant.firstName} {applicant.lastName} </div>)}
            </div>
        </div>
    </div>
}







