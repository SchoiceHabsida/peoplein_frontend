import { FC, useState } from "react";

import { Checkbox } from "@/common/components/inputs/checkbox";
import { IAdminFilter } from "@/common/constants/admin-filters.constants";
import './styles.css';

interface IInputDropdownProps {
    onChange: (selectedValue: IAdminFilter) => void;
    onClose: () => void;
    options: IAdminFilter[];
    styles?: { width: string }
    multiple?: boolean;
    label: string;
}

export const InputDropdown: FC<IInputDropdownProps> = ({ onChange, options, styles, onClose, label }) => {

    const [values, setValues] = useState<IAdminFilter[]>([]);

    const checkForSelected = (value: string): boolean => values.some(item => item.value === value);

    const onApply = () => {}

    return <div onClick={(e: any) => {e.stopPropagation(); e.preventDefault}} className="dropdown text-gray" style={styles}>
        <div className="dropdown__content">
            <div className="filter-header">{label}</div>
            <ul className="dropdown__items">
                {
                    options.map((option, index) => (
                        <li key={index} className={option.children?.length ? 'item-border-bottom' : ''} >
                            {option.label && <div className="filter-header">{option.label}</div>}
                            {option.children?.length ? <div>
                                {option.children?.map((child, idx) => <div key={idx} className="h-8 px-3">
                                    <Checkbox label={child.label} onChange={(value) => console.log(value)} />
                                </div>)}
                            </div> : null}
                        </li>
                    ))
                }
            </ul>
            <div className="actions flex w-full justify-end p-2 gap-2">
                <button className="px-4 py-2 text-gray cancel-btn rounded" onClick={onClose}>Cancel</button>
                <button className="px-4 py-2 text-white apply-btn rounded" onClick={onApply}>Apply</button>
            </div>
        </div>
    </div>
}
