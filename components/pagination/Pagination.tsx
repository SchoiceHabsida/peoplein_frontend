import { FC } from "react";
import React from 'react';
import Pagination from 'rc-pagination';
import './styles.css'

interface IPaginationProps {
    currentPage: number,
    totalElements: number,
    totalPages?: number,
    onPage: (values: IPaginationParams) => void,
    pageCount?: number
}

export interface IPaginationParams {
    pageNumber: number
    pageCount?: number,
}

export const defaultPageCount = 6;

export const CustomPagination: FC<IPaginationProps> = ({ currentPage,
    totalElements,
    pageCount,
    onPage }) => {
    const onChange = (page: any) => {
        onPage({ pageNumber: page - 1, pageCount: pageCount })
    }

    return <div>
        <Pagination
            defaultCurrent={currentPage + 1}
            total={totalElements || 1}
            pageSize={pageCount || defaultPageCount} style={{ margin: '100px' }}
            onChange={onChange} nextIcon="Next" prevIcon="Prev" />
    </div>
}