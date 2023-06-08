'use client'

import { DialogWrapper } from "@/common/components/dialog-wrapper/DialogWrapper";
import { Checkbox } from "@/common/components/inputs/checkbox";
import { DownIcon } from "@/common/icons/DownIcon";
import { EyeIcon } from "@/common/icons/EyeIcon";
import { AdminFilters } from "@/components/admin-filters";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { ContentHeader } from "@/components/content-header";
import { CustomPagination } from "@/components/pagination";
import { useState } from "react";

import './styles.css';
import { CompanyDetails } from "@/components/company-details/CompanyDetails";

export default function Companies() {
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

    return <div className="people flex flex-col justify-between h-full">
        {dialogOpen && <div className="absolute">
            <DialogWrapper onClose={() => setDialogOpen(false)}>
                <CompanyDetails/>
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
                                        Reg number
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
                        <tr className="cursor-pointer">
                            <th>
                                <Checkbox onChange={() => { }} />
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">Company 1</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                0101010101
                            </td>
                            <td>Java, JS, React</td>
                            <td>2022.11.20</td>
                            <td>
                                <button className="btn btn-ghost btn-xs"><EyeIcon /></button>
                            </td>
                        </tr>
                        <tr>
                            <th style={styles.tableStyles.tableBorder}>
                                <Checkbox onChange={() => { }} />
                            </th>
                            <td style={styles.tableStyles.tableBorder}>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">Company 1</div>
                                    </div>
                                </div>
                            </td>
                            <td style={styles.tableStyles.tableBorder}>
                            0101010101
                            </td>
                            <td style={styles.tableStyles.tableBorder}>Java, JS, React</td>
                            <td style={styles.tableStyles.tableBorder}>
                                2022.11.20
                            </td>
                            
                            <td style={styles.tableStyles.tableBorder}>
                                <button onClick={() => setDialogOpen(true)} className="btn btn-ghost btn-xs"><EyeIcon /></button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-full text-center table-pagination">
            <CustomPagination totalElements={8} currentPage={0} onPage={() => console.log}></CustomPagination>
        </div>
    </div>
}
