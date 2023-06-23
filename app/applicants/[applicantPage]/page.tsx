'use client'

import { IApplicantProviderType, useApplicants } from "@/common/components/applicants"
import { ApplicantQueryTypes, ApplicantPageTypes } from "@/common/constants/common.constants"
import { FilterContext, IFilterContext } from "@/common/providers/Filter.provider"
import { IPaginationParams, CustomPagination, defaultPageCount } from "@/components/pagination"
import { Fragment, useContext, useEffect, useState } from "react"
import { Card } from "@/components/card/Card"

export default function SearchPage({ params }: { params: { applicantPage: ApplicantPageTypes } }) {

  const [pageNumber, setPageNumber] = useState(0);
  const [dataKey, setDataKey] = useState(ApplicantQueryTypes.search);
  const { data, applicantQueryType, setApplicantQueryType, refetch, loading } = useApplicants() as IApplicantProviderType;
  const { input } = useContext(FilterContext) as IFilterContext;

  const filterData = () => {
    const newData: any = input;
    for (let key of Object.keys(input)) {
      if (!newData[key]) {
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
    {loading ? <span className="mt-4 mx-auto loading loading-spinner text-primary"></span> : <Fragment>
      {data?.[`${dataKey}`]?.content.length ? <div>
        <div className="mt-5 flex gap-5 flex-wrap">
          {data?.[`${dataKey}`]?.content?.map(applicant => <Card
            is_favorite={params.applicantPage === ApplicantPageTypes.favorites}
            is_scheduled_for_interview={params.applicantPage === ApplicantPageTypes.interviews}
            key={applicant.id} {...applicant}
            refetch={() => refetch({ ...applicantQueryType.variables })} />)}
        </div>
        <div className="flex justify-center mt-4">
          <CustomPagination
            currentPage={data?.[`${dataKey}`]?.currentPage || 0}
            totalElements={data?.[`${dataKey}`]?.totalElements || 0}
            onPage={(value: IPaginationParams) => {
              setPageNumber(value.pageNumber)
            }} />
        </div>
      </div> : <div className="mx-auto mt-4 uppercase text-slate-400 text-sm">No data found</div>}
    </Fragment>}
  </div>
  )
}
