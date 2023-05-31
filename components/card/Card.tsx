import Image from 'next/image';
import { FC } from 'react';

import './styles.css'
import { IApplicant } from '@/common/components/models/applicants.model';
import { calculateAge } from '@/common/components/utils/function';

export const Card: FC<IApplicant> = ({firstName, country, visa, dateOfBirth, specialization }) => {
    return <div className="card rounded">
        <div className='flex info-container'>
            <div>
                <Image src="/person.png"
                    width={205}
                    height={205}
                    className='rounded'
                    alt="person" />
            </div>
            <div className='mt-9'>
                <div>
                    <div className="font-bold text-base info-title">Nationality:</div>
                    <div>{country}</div>
                </div>
                <div>
                    <div className="font-bold text-base info-title">Visa:</div>
                    <div>{visa}</div>
                </div>
                <div>
                    <div className="font-bold text-base info-title">Age:</div>
                    <div>{calculateAge(dateOfBirth)}</div>
                </div>
            </div>
        </div>
        <div>
            <div className='person-name font-extrabold text-xl ml-6 uppercase'>{firstName}</div>
            <div className='text-base ml-6 mb-5'>{
                specialization?.map((item, index) => <span key={index} className='capitalize'> {item.toLocaleLowerCase()} </span>)
            }</div>
        </div>
        <div className='p-4 bordered-top'>
            Experience
        </div>
        <div className='p-4 bordered-top'>
            Programming languages
        </div>
        <div className='p-4 bordered-top colored'>+ Add to Favorites</div>
        <div className='p-4 bordered-top colored'>+ Invite for Interview</div>
    </div>
}