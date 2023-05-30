'use client'

import { IApplicantProviderType, useApplicants } from "@/common/components/applicants"
import { ApplicantQueryTypes, ApplicantPageTypes } from "@/common/constants/common.constants"
import { Card } from "@/components/card/Card"
import { IPaginationParams, Pagination } from "@/components/pagination"
import { useEffect } from "react"

export default function SearchPage({ params }: { params: { applicantPage: ApplicantPageTypes } }) {

  const { data, setApplicantQueryType, setPageNumber } = useApplicants() as IApplicantProviderType

  useEffect(() => {
    setApplicantQueryType(ApplicantQueryTypes[params.applicantPage]) 
  }, [params.applicantPage])

  return (<div className="flex flex-col">
    <div className="mt-5 flex gap-5 flex-wrap">
      {data?.[`${ApplicantQueryTypes[params.applicantPage]}`]?.content?.map(applicant => <Card key={applicant.id} {...applicant}/>)}
    </div>
    <div className="flex justify-center mt-4">
      <Pagination
        currentPage={data?.[`${ApplicantQueryTypes[params.applicantPage]}`]?.currentPage || 0}
        totalElements={data?.[`${ApplicantQueryTypes[params.applicantPage]}`]?.totalElements || 0}
        onPage={(value: IPaginationParams) => setPageNumber(value.pageNumber)} totalPages={4} />
    </div>
  </div>
  )
}
