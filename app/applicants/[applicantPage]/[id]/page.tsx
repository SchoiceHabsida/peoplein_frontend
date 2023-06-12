'use client'
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import './styles.css';
import { calculateAge } from '@/common/components/utils/function';
import { IApplicant } from '@/common/components/models/applicants.model';

export const GET_APPLICANT_BY_ID = gql`
    query getApplicant ($id: ID!) {
        getApplicantById (id: $id) {
            id
            profilePicture {
                id
                path
                type
            }
            firstName
            lastName
            country
            gender
            visa
            specialization
            dateOfBirth
            degree
            yearsOfExperience
            resumeGoogleDrivePath
            languages {
                languageName
            }
            skills {
                skillName
                skillType
            }
            experience {
                id
                company
                startOfWork
                endOfWork
                details
                yearsWorked
            }
            certificates {
                id
                certificateName
                acquisitionDate
                expiryDate
            }
        }
    }
`

export default function Profile({ params }: { params: { id: string } }) {
    const is_favorite = false;
    const { data, loading } = useQuery<{ 'getApplicantById': IApplicant }>(GET_APPLICANT_BY_ID, { variables: { id: params.id } })

    return (<div>
        <div className='mt-4 profile rounded'>
            <div className='profile-header'>
                <Image src="/person.png"
                    width={205}
                    height={205}
                    className='rounded'
                    alt="person" />
            </div>
            <div className='flex mt-6 mb-5 mx-5'>
                <div className='w-1/2'>
                    <div className='flex flex-col'>
                        <div className='font-extrabold text-xl uppercase'>{data?.getApplicantById.firstName}</div>
                        <div>
                            {data?.getApplicantById.specialization
                                ?.map((item: any, index: number) => <span key={index} className='capitalize'> {item.toLocaleLowerCase()} </span>)}
                        </div>
                    </div>
                </div>
                <div className='w-1/2 flex justify-between'>
                    <div className='w-1/3 flex flex-col'>
                        <div className="font-bold text-base info-title">Nationality:</div>
                        <div>{data?.getApplicantById?.country}</div>
                    </div>
                    <div className='w-1/3'>
                        <div className="font-bold text-base info-title">Visa:</div>
                        <div>{data?.getApplicantById?.visa}</div>
                    </div>
                    <div className='w-1/3'>
                        <div className="font-bold text-base info-title">Age:</div>
                        <div>{calculateAge(data?.getApplicantById?.dateOfBirth || '' as any)}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={`p-4 bordered-top ${is_favorite ? '' : 'colored'}`} >
                    {is_favorite ? '- Remove from Favorites' : '+ Add to Favorites'}
                </div>
                <div className='p-4 bordered-top colored'>+ Invite for Interview</div>
            </div>
            <div className='mt-6 mb-5 mx-5'>
                <div>About</div>
                <div>Degree: {data?.getApplicantById?.degree}</div>
            </div>
            {data?.getApplicantById?.experience?.map((item, index) => <div className='mt-6 mb-5 mx-5'>
                <div>{item.company}</div>
                <div>{item.details}</div>
            </div>)}


            <div className='mt-6 mb-5 mx-5'>
                <div>Skills</div>
                {data?.getApplicantById?.skills?.map((item, index) => <div key={index}>{item.skillName}</div>)}
            </div>

            <div className='mt-6 mb-5 mx-5'>
                <div>Best Regards</div>
                <div>PM</div>
            </div>

        </div>
        <div className='mt-6 mb-5 bottom-actions rounded text-purple-primary'>
            <div className='m-4'>
                <a target='_blank' href={data?.getApplicantById.resumeGoogleDrivePath}>Download Resume</a>
            </div >
            <div className='bordered-top '></div>
            <div className='m-4 '>
                <a target='_blank' href={data?.getApplicantById.resumeGoogleDrivePath}>View Portfolio</a>
            </div>
        </div>
    </div>
    )
}

