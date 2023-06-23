'use client'
import { SettingsIcon } from "@/common/icons/SettingsIcon"
import { FC, useState } from "react"
import { InputDropdown } from "../input-dropdown"
import { STATUS_ACTIONS } from "@/common/constants"

export const AdminStatusActions = () => {
    const [open, setOpen] = useState(false);
    return <div className="relative">
        <ActionButtonWrapper label={'Status'} icon={<SettingsIcon />}
            onCLick={() => setOpen(true)}></ActionButtonWrapper>
        {open &&
            <div className="absolute top-0 left-0">
                <InputDropdown
                    label={'User account'}
                    onClose={() => setOpen(false)}
                    onChange={(values) => console.log(values)}
                    options={STATUS_ACTIONS}
                    multiple={true}
                    styles={{ width: '240px' }} />
            </div>
        }
    </div>
}

export const ActionButtonWrapper: FC<{ label: string, icon: React.ReactNode, onCLick: () => void }> = ({
    label, icon, onCLick }) => {
    return <div
        onClick={onCLick}
        className="w-60 h-10 bg-white flex justify-between
            items-center cursor-pointer px-4 rounded-lg font-medium">
        <span>{label}</span>
        <button onClick={onCLick}>{icon}</button>
    </div>
}