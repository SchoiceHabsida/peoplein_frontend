'use client'

import { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
    label?: string,
    onChange: (date: any) => void,
    value: any
}

export const CustomDatePicker: FC<IDatePickerProps> = ({
    value: defaultValue,
    onChange,
    label
}) => {

    const [date, setDate] = useState(defaultValue);

    const handleDateSelect = (values: any) => {
        onChange(values)
    }

    const handleDateChange = (values: any, event: any) => {
        if(values === null) {
            onChange(undefined);
        }

        const date = new Date(event.target.value);
        
        if(!isNaN(date.getTime()) && event.target.value?.length > 6){
            onChange(date)
        }
        
    }

    useEffect(() => {
        setDate(defaultValue)
    }, [defaultValue])

    return <div>
        <label className="font-medium inline-block" style={{marginBottom: '6px'}}>{label}</label>
        <DatePicker selected={date} onChange={handleDateChange} onSelect={handleDateSelect} />
    </div>
}