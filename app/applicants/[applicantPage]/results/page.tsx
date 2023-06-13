'use client'

import { IApplicant, IPageable } from "@/common/components/models/applicants.model";
import { ISearchProvider, SearchContext } from "@/common/providers"
import { Card } from "@/components/card/Card";
import { IPaginationParams, CustomPagination } from "@/components/pagination";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react"

export const SEARCH_BY_KEYWORD = gql`
    query searchApplicants ($pageNumber: Int, $pageCount: Int, $keyword: String) {
        searchApplicantsByKeyword (pageNumber: $pageNumber, pageCount: $pageCount, keyword: $keyword) {
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

export default function Results() {
    const [pageNumber, setPageNumber] = useState(0);
    const { keyword } = useContext(SearchContext) as ISearchProvider;
    const { data, refetch, loading } =
        useQuery<Record<'searchApplicantsByKeyword', IPageable<IApplicant>>, IPaginationParams & { keyword: string }>(SEARCH_BY_KEYWORD, {
            variables: {
                keyword: keyword,
                pageNumber: pageNumber,
            }
        })

    useEffect(() => {
        refetch({ keyword, pageNumber })
    }, [keyword, pageNumber])

    return (<div className="flex flex-col ">
        <div className="mt-5 flex gap-5 flex-wrap">
            {data?.searchApplicantsByKeyword?.content?.map(applicant => <Card
                refetch={() => console.log('refetch')}
                key={applicant.id} {...applicant} />)}
        </div>
        <div className="flex justify-center mt-4">
            <CustomPagination
                currentPage={data?.searchApplicantsByKeyword?.currentPage || 0}
                totalElements={data?.searchApplicantsByKeyword?.totalElements || 0}
                onPage={(value: IPaginationParams) => {
                    setPageNumber(value.pageNumber)
                }} />
        </div>
    </div>
    )
}
