import Image from 'next/image';
import { FC } from 'react';

import './styles.css'

export const Card: FC = () => {
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
                    <div>Canada</div>
                </div>
                <div>
                    <div className="font-bold text-base info-title">Visa:</div>
                    <div>F4</div>
                </div>
                <div>
                    <div className="font-bold text-base info-title">Age:</div>
                    <div>40</div>
                </div>
            </div>
        </div>
        <div>
            <div className='person-name font-extrabold text-xl ml-6'>Roberto</div>
            <div className='text-base ml-6 mb-5'>Specialization</div>
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