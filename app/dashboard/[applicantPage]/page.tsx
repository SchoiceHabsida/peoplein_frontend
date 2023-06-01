'use client'

import { IApplicantProviderType, useApplicants } from "@/common/components/applicants"
import { ApplicantQueryTypes, ApplicantPageTypes } from "@/common/constants/common.constants"
import { FilterContext, IFilterContext } from "@/common/providers/Filter.provider"
import { IPaginationParams, Pagination, defaultPageCount } from "@/components/pagination"
import { Card } from "@/components/card/Card"
import { useContext, useEffect, useState } from "react"

export default function SearchPage({ params }: { params: { applicantPage: ApplicantPageTypes } }) {

  const [pageNumber, setPageNumber] = useState(0);
  const [dataKey, setDataKey] = useState(ApplicantQueryTypes.search);
  const { data, applicantQueryType, setApplicantQueryType, refetch } = useApplicants() as IApplicantProviderType;
  const { input } = useContext(FilterContext) as IFilterContext;
  
  const filterData = () => {
    const newData: any = input;
    for(let key of Object.keys(input)) {
      if(!newData[key]){
        delete newData[key]
      }
    }
    return newData
  }

  useEffect(() => {
    if (Object.values(input)?.some(value => value)) {
      setApplicantQueryType({
        type: ApplicantQueryTypes.filter,
        variables: { pageNumber, pageCount: defaultPageCount, input: filterData() }
      });
      setDataKey(ApplicantQueryTypes.filter);
    } else {
      setApplicantQueryType({
        type: ApplicantQueryTypes[params.applicantPage],
        variables: { pageNumber, pageCount: defaultPageCount, }
      });
      setDataKey(ApplicantQueryTypes[params.applicantPage])
    }
  }, [input, params.applicantPage, pageNumber])

  return (<div className="flex flex-col">
    <div className="mt-5 flex gap-5 flex-wrap">
      {data?.[`${dataKey}`]?.content?.map(applicant => <Card 
      key={applicant.id} {...applicant} refetch={() => refetch({...applicantQueryType.variables})} />)}
    </div>
    <div className="flex justify-center mt-4">
      <Pagination
        currentPage={data?.[`${dataKey}`]?.currentPage || 0}
        totalElements={data?.[`${dataKey}`]?.totalElements || 0}
        onPage={(value: IPaginationParams) => {
          setPageNumber(value.pageNumber)
        }

        } totalPages={4} />
    </div>
  </div>
  )
}
