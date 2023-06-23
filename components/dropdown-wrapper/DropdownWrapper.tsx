'use client'
import { DownIcon } from "@/common/icons/DownIcon";
import { FC, useState } from "react";
import { InputDropdown } from "../input-dropdown";
import { IAdminFilter } from "@/common/constants/admin-filters.constants";

export interface IDropdownWrapper {
    label: string,
    values?: any,
    options: IAdminFilter[],
    onChange?: (value: any) => void,
    dropDownWidth: string
}

export const DropdownWrapper: FC<IDropdownWrapper> = ({ label, options, dropDownWidth }) => {

    const [open, setOpen] = useState(false);

    return <div onClick={() => setOpen(!open)} className="filter-input w-full rounded h-10 flex items-center justify-between px-2 cursor-pointer relative">
        <div className="flex items-center justify-between w-full">
            <div>
                {label}
            </div>
            <div>
                <DownIcon />
            </div>
            {open &&
                <div className="absolute -top-1 -left-1">
                    <InputDropdown
                        label={label}
                        onClose={() => setOpen(false)}
                        onChange={(values) => console.log(values)}
                        options={options}
                        multiple={true}
                        styles={{ width: dropDownWidth }} />
                </div>
            }
        </div>
    </div>
}