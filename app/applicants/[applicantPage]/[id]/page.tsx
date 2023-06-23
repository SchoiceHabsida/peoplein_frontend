'use client'

import './styles.css';
import { useParams } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import { calculateAge } from '@/common/components/utils/function';
import { IApplicant } from '@/common/components/models/applicants.model';
import { ApplicantPageTypes } from '@/common/constants/common.constants';
import { useFavorite, useInterview } from '@/common/hooks.ts';
import { GET_APPLICANT_BY_ID } from './query';

export default function Profile({ params }: { params: { id: string } }) {

    const { applicantPage } = useParams();

    const is_scheduled_for_interview = applicantPage === ApplicantPageTypes.interviews;
    const is_favorite = applicantPage === ApplicantPageTypes.favorites;
    const { data, loading, refetch } = useQuery<{ 'getApplicantById': IApplicant }>(GET_APPLICANT_BY_ID, 
        { variables: { id: params.id }, fetchPolicy: 'no-cache' })
    const { updateFavorite } = useFavorite(!!is_favorite, refetch, params.id);
    const { updateInterview } = useInterview(!!is_scheduled_for_interview, refetch, params.id);

    return (<div>
        <div className='mt-4 profile rounded'>
            <div className='profile-header'>
                <img src={data?.getApplicantById.profilePicture ? data?.getApplicantById.profilePicture?.path : '/Avatar-Image.png'}
                    width={205}
                    style={{height: "205px"}}
                    className='rounded' alt='person'></img>
            </div>
            <div>
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
                <div onClick={updateFavorite} className={`p-4 bordered-top font-bold cursor-pointer ${is_favorite ? '' : 'colored'}`} >
                    {is_favorite ? '- Remove from Favorites' : '+ Add to Favorites'}
                </div>
                <div className={`p-4 bordered-top font-bold cursor-pointer ${is_scheduled_for_interview ? '' : 'colored'}`}
                    onClick={updateInterview}>
                    {is_scheduled_for_interview ? '- Remove from Interview' : '+ Invite for Interview'}
                </div>
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

