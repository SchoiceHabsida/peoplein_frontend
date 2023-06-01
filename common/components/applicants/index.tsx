'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { IPaginationParams, defaultPageCount } from '@/components/pagination';
import { IApplicant, IFilters, IPageable } from '../models/applicants.model';
import { ApplicantQueryTypes } from '@/common/constants/common.constants';

const createApplicantQuery = (applicantQueryType: string, input?: IFilters) => {
    return gql`
    query GetApplicants ($pageNumber: Int!, $pageCount: Int!, ${input ? `$input: CriteriaInput!` : ''}) {
        ${applicantQueryType}(pageNumber: $pageNumber, pageCount: $pageCount, ${input ? 'input: $input' : ''}) {
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
                specialization
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

    const [applicantQueryType, setApplicantQueryType] =
        useState<{ type: ApplicantQueryTypes, variables: IPaginationParams & { input?: IFilters } }>({ type: ApplicantQueryTypes.search, variables: { pageNumber: 0, pageCount: defaultPageCount } })
    const { client, loading, error, data, refetch } =
        useQuery<Record<ApplicantQueryTypes, IPageable<IApplicant>>, IPaginationParams & { input?: IFilters }>(createApplicantQuery(applicantQueryType.type, applicantQueryType.variables.input), {
            variables: { ...applicantQueryType.variables }
        });

    useEffect(() => {
        refetch({ ...applicantQueryType.variables })
    }, [applicantQueryType])

    return {
        loading,
        error,
        data,
        applicantQueryType,
        setApplicantQueryType,
        refetch
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
                children
            }
        </ApplicantsContext.Provider>
    );
}

export {
    ApplicantsProvider,
    useApplicants,
};
