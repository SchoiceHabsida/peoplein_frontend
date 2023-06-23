'use client'

import { DialogWrapper } from "@/common/components/dialog-wrapper/DialogWrapper";
import { Checkbox } from "@/common/components/inputs/checkbox";
import { DownIcon } from "@/common/icons/DownIcon";
import { EyeIcon } from "@/common/icons/EyeIcon";
import { AdminFilters } from "@/components/admin-filters";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";
import { CustomPagination, IPaginationParams } from "@/components/pagination";
import { useState } from "react";

import './styles.css';
import { CompanyDetails } from "@/components/company-details/CompanyDetails";
import { gql, useQuery } from "@apollo/client";
import { IPageable } from "@/common/components/models/applicants.model";
import { ICompany } from "@/common/components/models/companies.model";

const Companies_QUERY = gql`
    query GetAllCompanies ($pageNumber: Int!, $pageCount: Int!) {
        getAllCompaniesPaged (pageNumber: $pageNumber, pageCount: $pageCount) {
            content{
                id
                address
                hrManager
                name
                phoneNumber
                registrationNumber
                requiredSkills{
                    skillName
                }
                foundedAt
            }
        currentPage
        totalElements
        totalPages
      }
    }
  `

export default function Companies() {
    const [openedId, setOpenedId] = useState('')
    const { data, loading, error, refetch } =
        useQuery<Record<'getAllCompaniesPaged', IPageable<ICompany>>>
            (Companies_QUERY, { variables: { pageNumber: 0, pageCount: 10 } });
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

    const onPage = (values: IPaginationParams) => {
        refetch(values)
    }

    return <div className="people flex flex-col justify-between h-full">
        {dialogOpen && <div className="absolute">
            <DialogWrapper onClose={() => setDialogOpen(false)}>
                <CompanyDetails id={openedId}/>
            </DialogWrapper>
        </div>}
        <div>
            <ContentHeader label="Company list">
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
                                        Company
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Registration number
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Phone number
                                    </span>
                                    <DownIcon />
                                </div>
                            </th>
                            <th>
                                <div className="flex gap-1 cursor-pointer">
                                    <span>
                                        Skills
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
                            <th style={styles.tableStyles.header}>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.getAllCompaniesPaged.content.map((company) => {
                                return <tr className="cursor-pointer" key={company.id}>
                                    <th>
                                        <Checkbox onChange={() => { }} />
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{company.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {company.registrationNumber}
                                    </td>
                                    <td>{company.phoneNumber}</td>
                                    <td>
                                        {company.requiredSkills?.map(skill => <div key={skill.skillName}>{skill.skillName}</div>)}
                                    </td>
                                    <td>{company.foundedAt}</td>
                                    <td>
                                    <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => { setOpenedId(company.id as any); setDialogOpen(true) }}><EyeIcon /></button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <div className="w-full text-center mt-4">
                    {loading ?
                        <span className="loading loading-spinner loading-md"></span> :
                        data?.getAllCompaniesPaged.content.length === 0
                        && <div className="mx-auto uppercase text-slate-400 text-sm">No data found</div>}
                </div>
            </div>
        </div>
        <div className="w-full text-center table-pagination">
            <CustomPagination
                totalElements={data?.getAllCompaniesPaged.totalElements || 1}
                currentPage={data?.getAllCompaniesPaged.currentPage || 0}
                pageCount={10}
                onPage={onPage} />
        </div>
    </div>
}
