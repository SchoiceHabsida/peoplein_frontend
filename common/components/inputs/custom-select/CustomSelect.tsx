'use client'
import { FC, useEffect, useState } from "react";
import Select from 'react-select';

import './styles.css'

export interface ICustomSelectProps {
    value: any,
    label?: string,
    multiple?: boolean,
    options: any[],
    onChange: (value: any) => void,
}

export interface ISelectOptions {
    value: any,
    label: string,
}

export const CustomSelect: FC<ICustomSelectProps> = ({
    onChange,
    value,
    multiple,
    options,
    label }) => {
        
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        setSelected(value);
    }, [value])

    return <div>
        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>{label}</label>
        <Select
            instanceId={'instanceId'}
            value={selected}
            defaultValue={selected}
            onChange={onChange}
            isMulti={multiple}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </div>
}