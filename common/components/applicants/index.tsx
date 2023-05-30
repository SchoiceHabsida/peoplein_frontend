'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { IPaginationParams, defaultPageCount } from '@/components/pagination';
import { IApplicant, IPageable } from '../models/applicants.model';
import { ApplicantQueryTypes } from '@/common/constants/common.constants';

const createApplicantQuery = (applicantQueryType: string) => {
    return gql`
    query GetApplicants ($pageNumber: Int!, $pageCount: Int!) {
        ${applicantQueryType}(pageNumber: $pageNumber, pageCount: $pageCount) {
            content{
                id
                firstName
                lastName
                country
                gender
                visa
                dateOfBirth
                yearsOfExperience,
                profilePicture {
                    id
                    path
                    type
                }
            }
        currentPage
        totalElements
        totalPages
      }
    }
  `
}

const ApplicantsContext = createContext({});

const useApplicantsProvider = () => {

    const [applicantQueryType, setApplicantQueryType] = useState<ApplicantQueryTypes>(ApplicantQueryTypes.getAllApplicantsPaged)
    const [pageNumber, setPageNumber] = useState<number>(0)
    const { client, loading, error, data, refetch, } = useQuery<Record<ApplicantQueryTypes, IPageable<IApplicant>>, IPaginationParams>(createApplicantQuery(applicantQueryType), {
        variables: {pageNumber: 0, pageCount: defaultPageCount}
    });
    useEffect(() => {
        refetch({pageNumber, pageCount: defaultPageCount})
    },  [applicantQueryType, pageNumber])
    
    return {
        loading,
        error,
        data,
        setApplicantQueryType,
        setPageNumber
    };
}

export type IApplicantProviderType = ReturnType<typeof useApplicantsProvider>;

const useApplicants = () => {
    return useContext(ApplicantsContext);
}

function ApplicantsProvider({ children }: any) {
    const applicants = useApplicantsProvider();
    return (
        <ApplicantsContext.Provider value={applicants}>
            {
                applicants.loading
                    ? <div>Loading...</div>
                    : children
            }
        </ApplicantsContext.Provider>
    );
}

export {
    ApplicantsProvider,
    useApplicants,
};
