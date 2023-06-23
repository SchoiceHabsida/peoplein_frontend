'use client'

import { DialogWrapper } from "@/common/components/dialog-wrapper/DialogWrapper";
import { CustomPagination, IPaginationParams } from "@/components/pagination";
import { Checkbox } from "@/common/components/inputs/checkbox";
import { DownIcon } from "@/common/icons/DownIcon";
import { EyeIcon } from "@/common/icons/EyeIcon";
import { AdminFilters } from "@/components/admin-filters";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";
import { useContext, useEffect, useState } from "react";

import './styles.css';
import { gql, useQuery } from "@apollo/client";
import { AdminFiltersContext, IAdminFilters } from "@/common/providers";
import { ApplicantDetails } from "@/components/applicant-details/ApplicantDetails";
import { IApplicant, IPageable } from "@/common/components/models/applicants.model";
import { formatDate } from "@/common/components/utils/function";
import { SEARCH_BY_KEYWORD } from "@/app/applicants/[applicantPage]/results/query";

const APPLICANT_QUERY = gql`
    query GetApplicants ($pageNumber: Int!, $pageCount: Int!, $companyId: ID!) {
        getAllApplicantsPaged (pageNumber: $pageNumber, pageCount: $pageCount, companyId: $companyId) {
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
                createdAt,
                status
            }
        currentPage
        totalElements
        totalPages
      }
    }
  `

export default function People() {
    const [isSearching, setIsSearching] = useState(false);
    const { data, loading, error, refetch } =
        useQuery<Record<'getAllApplicantsPaged', IPageable<IApplicant>>>
            (APPLICANT_QUERY, { variables: { pageNumber: 0, pageCount: 10, companyId: "" } });
    const styles = {
        tableStyles: {
            header: {
                borderRadius: 0
            },
            statusBadge: {
                height: '28px',
                fontSize: '12px',
                color: '#667085',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
            },
            statusBadgeHeader: {
                background: '#FFFFFF',
                border: '1px solid #FFFFFF',
            },
            statusBadgeContent: {
                background: '#F2F4F7',
                border: '1px solid #F2F4F7',
            },
            tableBorder: {
                borderBottom: '1px solid #f2f2f2 !important'
            }
        }
    }

    const [dialogOpen, setDialogOpen] = useState(false);
    const [openedId, setOpenedId] = useState('')

    const { keyword, setKeyword } = useContext(AdminFiltersContext) as IAdminFilters;

    const { data: searchedApplicants, refetch: refetchApplicants, loading: isSearchingApplicants } =
        useQuery<Record<'searchApplicantsByKeyword', IPageable<IApplicant>>, IPaginationParams & { keyword: string }>
            (SEARCH_BY_KEYWORD, {
                variables: {
                    keyword: keyword,
                    pageNumber: 0,
                },
                skip: !keyword
            })

    const onPage = (values: IPaginationParams) => {
        refetch(values)
    }

    useEffect(() => {
        refetch({ pageNumber: 0, pageCount: 10 });
    }, [])

    useEffect(() => {
        if (keyword) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }, [keyword])

    useEffect(() => {
        return () => { setKeyword('') };
    }, [])

    const getData = (isSearching: boolean): IPageable<IApplicant> | undefined => {
        return isSearching
            ? searchedApplicants?.searchApplicantsByKeyword :
            data?.getAllApplicantsPaged;
    }

    return <div className="people flex flex-col justify-between h-full">
        {dialogOpen && <div className="absolute">
            <DialogWrapper onClose={() => setDialogOpen(false)}>
                <ApplicantDetails applicantId={openedId} />
            </DialogWrapper>
        </div>}
        <div>
            <ContentHeader label="People list">
                <Breadcrumb with_bg={false} />
                <AdminFilters />
            </ContentHeader>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th style={styles.tableStyles.header}>
                                <Checkbox onChange={() => { }} />
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Name
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Specialization
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Nationality
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Visa
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Created at
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div style={{ ...styles.tableStyles.statusBadge, ...styles.tableStyles.statusBadgeHeader }}>Status</div>
                            </th>
                            <th style={styles.tableStyles.header}>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(getData(isSearching)?.content) ?
                            getData(isSearching)?.content?.map(applicant => <tr key={applicant.id} className="cursor-pointer">
                                <th>
                                    <Checkbox onChange={() => { }} />
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{applicant.firstName} {applicant.lastName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {applicant.specialization?.map((item, idx) => <span key={idx}> {item}</span>)}
                                </td>
                                <td>{applicant.country}</td>
                                <td>
                                    {applicant.visa}
                                </td>
                                <td>{applicant.createdAt ? formatDate(new Date(applicant.createdAt)) : null}</td>
                                <td>
                                    <div style={{ ...styles.tableStyles.statusBadge, ...styles.tableStyles.statusBadgeContent }}>
                                        {applicant.status}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => { setOpenedId(applicant.id); setDialogOpen(true) }}><EyeIcon /></button>
                                </td>
                            </tr>) : null
                        }
                    </tbody>
                </table>
                <div className="w-full text-center mt-4">
                    {loading || isSearchingApplicants ?
                        <span className="loading loading-spinner loading-md"></span> :
                        getData(isSearching)?.content.length === 0
                        && <div className="mx-auto uppercase text-slate-400 text-sm">No data found</div>}
                </div>
            </div>
        </div>
        <div className="w-full text-center table-pagination">
            <CustomPagination
                totalElements={getData(isSearching)?.totalElements || 1}
                currentPage={getData(isSearching)?.currentPage || 0}
                pageCount={10}
                onPage={onPage} />
        </div>
    </div>
}
