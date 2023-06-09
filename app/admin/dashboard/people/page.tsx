'use client'

import { DialogWrapper } from "@/common/components/dialog-wrapper/DialogWrapper";
import { Checkbox } from "@/common/components/inputs/checkbox";
import { DownIcon } from "@/common/icons/DownIcon";
import { EyeIcon } from "@/common/icons/EyeIcon";
import { AdminFilters } from "@/components/admin-filters";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";
import { CustomPagination, IPaginationParams } from "@/components/pagination";
import { useEffect, useState } from "react";

import { ApplicantDetails } from "@/components/applicant-details/ApplicantDetails";
import { gql, useQuery } from "@apollo/client";
import './styles.css';
import { IApplicant, IPageable } from "@/common/components/models/applicants.model";

const APPLICANT_QUERY = gql`
    query GetApplicants ($pageNumber: Int!, $pageCount: Int!) {
        getAllApplicantsPaged (pageNumber: $pageNumber, pageCount: $pageCount) {
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


export default function People() {
    const { data, loading, error, refetch } =
        useQuery<Record<'getAllApplicantsPaged', IPageable<IApplicant>>>
            (APPLICANT_QUERY, { variables: { pageNumber: 0, pageCount: 10 } });
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

    const onPage = (values: IPaginationParams) => {
        refetch(values)
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
                        {(data?.getAllApplicantsPaged.content && data?.getAllApplicantsPaged?.content.length) ?
                            data.getAllApplicantsPaged?.content
                                .map(applicant => <tr key={applicant.id} className="cursor-pointer">
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
                                    <td>-</td>
                                    <td>
                                        <div style={{ ...styles.tableStyles.statusBadge, ...styles.tableStyles.statusBadgeContent }}>
                                            -
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => { setOpenedId(applicant.id); setDialogOpen(true) }}><EyeIcon /></button>
                                    </td>
                                </tr>) :
                            <tr className="w-full px-2 text-gray-400 text-center flex"><td className="w-full">No data found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-full text-center table-pagination">
            <CustomPagination
                totalElements={data?.getAllApplicantsPaged.totalElements || 1}
                currentPage={data?.getAllApplicantsPaged.currentPage || 0}
                pageCount={10}
                onPage={onPage} />
        </div>
    </div>
}
