import { FC } from "react";

interface IPaginationProps {
    currentPage: number,
    totalElements: number,
    totalPages?: number,
    onPage: (values: IPaginationParams) => void
}

export interface IPaginationParams {
    pageNumber: number
    pageCount?: number,
}

export const defaultPageCount = 2;

export const Pagination: FC<IPaginationProps> = ({ currentPage, totalElements, onPage }) => {

    const renderButtons = (n: number) => {
        const buttons = [];
        for (let i = 0; i < n; i++) {
            buttons.push(<button key={i}
                onClick={() => onPage({ pageNumber: i })}
                className={`btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}>{i + 1}</button>);
        }
        return buttons;
    };

    return <div>
        <div className="btn-group">
            {renderButtons(Math.ceil(totalElements / defaultPageCount))}
        </div>
    </div>
}