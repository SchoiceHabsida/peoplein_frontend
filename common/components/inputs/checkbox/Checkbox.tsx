import { FC } from "react";
import './styles.css'

interface ICheckboxProps {
    label?: string,
    checked?: boolean,
    onChange: (checked: boolean) => void
}

export const Checkbox: FC<ICheckboxProps> = ({ checked, onChange: onCheck,  label}) => {

    const onChange = (e: any) => {
        onCheck(e.target.checked)
    }

    return <label className="checkbox-wrapper flex items-center gap-2">
        <input
            checked={checked}
            type="checkbox"
            className="custom-checkbox checkbox"
            onChange={onChange} />
            <span>{label}</span>
    </label>
}