'use client'

import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/function";

interface IDatePickerProps {
    label?: string,
    onChange: (date: any) => void,
    value: any
}

export const CustomDatePicker: FC<IDatePickerProps> = ({
    value,
    onChange,
    label
}) => {
      
    const handleDateSelect = (values: any) => {
        onChange(formatDate(values))
    }

    const handleDateChange = (values: any, event: any) => {
        if (values === null) {
            onChange(undefined);
        }

        const date = new Date(event.target.value);

        if (!isNaN(date.getTime()) && event.target.value?.length > 6) {
            onChange(formatDate(date))
        }

    }

    return <div>
        <label className="font-medium inline-block" style={{ marginBottom: '6px' }}>{label}</label>
        <DatePicker selected={checkForDate(value)} onChange={handleDateChange} onSelect={handleDateSelect} />
    </div>
}

export const checkForDate = (d: any) => {
    const date = new Date(d);
    if (!isNaN(date.getTime())) {
        return date
    } else {
        return undefined
    }
}