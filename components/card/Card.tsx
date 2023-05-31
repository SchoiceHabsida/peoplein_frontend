import Image from 'next/image';
import { FC } from 'react';
import { useRouter, usePathname } from "next/navigation";

import './styles.css'
import { IApplicant } from '@/common/components/models/applicants.model';
import { calculateAge } from '@/common/components/utils/function';
import { useQuery, useMutation, gql } from '@apollo/client';

const ADD_FAVORITE_MUTATION = '';

const createMutation = (type: string) => {
    return gql`
    mutation ($id: ID!) {
      ${type} (id: $id)
    }
  `
}

export const Card: FC<IApplicant & {refetch: () => void}> = ({refetch, id, firstName, country, visa, is_favorite, dateOfBirth, specialization }) => {
    const router = useRouter();
    const currentUrl = usePathname();
    
    const [ addFavorite, { loading: mutationLoading }] =
     useMutation(createMutation(is_favorite ? 'deleteApplicantFromFavourites' :'addApplicantToFavourites'));

    const updateFavorite = async () => {
        try {
            const response = await addFavorite({
                variables: {id}   
            })
            if(response) {
                refetch()
            }
        } catch(error) {
            console.log(error);
            
        }
    }
    return <div className="card rounded" onClick={() => router.push(currentUrl + '/' + id)}>
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
        
        <div className={`p-4 bordered-top ${is_favorite ? '' : 'colored'}`} onClick={updateFavorite}>
            {is_favorite ? '- Remove from Favorites' :'+ Add to Favorites'}
            </div>
        <div className='p-4 bordered-top colored'>+ Invite for Interview</div>
    </div>
}