import { useState } from "react";

import './styles.css';
import { SearchIcon } from "@/common/icons/SearchIcon";
import { DropdownWrapper } from "../dropdown-wrapper/DropdownWrapper";
import { STATUS_FILTERS, ADMIN_FILTERS } from "@/common/constants/admin-filters.constants";

export const AdminFilters = () => {
    const [open, setOpen] = useState(false);
    return <div className="flex gap-3 items-end mr-16">
        <div className="flex flex-col gap-4">
            <div className="search-input-wrapper flex rounded pl-5">
                <div className="h-full flex items-center">
                    <SearchIcon></SearchIcon>
                </div>
                <input placeholder="Search by name or company" className="search-input"></input>
            </div>

            <div className="flex items-center justify-between gap-3">
                <DropdownWrapper label="Filter" options={ADMIN_FILTERS} dropDownWidth="340px"></DropdownWrapper>
                <DropdownWrapper label="Choose action" options={STATUS_FILTERS} dropDownWidth="240px"></DropdownWrapper>
            </div>
        </div>
        <div>
            <button className="text-white font-semibold rounded py-2 px-4 apply-button">Apply</button>
        </div>
    </div>
}
