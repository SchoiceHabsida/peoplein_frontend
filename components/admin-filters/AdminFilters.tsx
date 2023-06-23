'use client'

import { ChangeEvent, useContext, useEffect, useState } from "react";

import './styles.css';
import { SearchIcon } from "@/common/icons/SearchIcon";
import { DropdownWrapper } from "../dropdown-wrapper/DropdownWrapper";
import { ADMIN_FILTERS } from "@/common/constants/admin-filters.constants";
import { AdminFiltersContext, IAdminFilters } from "@/common/providers";

export const AdminFilters = () => {

    const [searchValue, setSearchValue] = useState('');
    const { setKeyword } = useContext(AdminFiltersContext) as IAdminFilters;

    const onApply = () => {
        setKeyword(searchValue);
    }

    useEffect(() => {
        return setSearchValue('');
    }, [])

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        if(!e.target.value) {
            setKeyword('')
        }
    }

    return <div className="flex gap-3 items-end mr-16">
        <div className="flex flex-col gap-4">
            <div className="search-input-wrapper flex rounded pl-5">
                <div className="h-full flex items-center">
                    <SearchIcon></SearchIcon>
                </div>
                <input value={searchValue} onChange={onSearchChange}
                    placeholder="Search by name or company" className="search-input rounded ml-2"/>
            </div>
            <div className="flex items-center justify-between gap-3">
                <DropdownWrapper label="Filter" options={ADMIN_FILTERS} dropDownWidth="340px"></DropdownWrapper>
                {/* <DropdownWrapper label="Choose action" options={STATUS_FILTERS} dropDownWidth="240px"></DropdownWrapper> */}
            </div>
        </div>
        <div>
            <button
                onClick={onApply}
                className="text-white font-semibold rounded py-2 px-4 apply-button"
            >Apply</button>
        </div>
    </div>
}
