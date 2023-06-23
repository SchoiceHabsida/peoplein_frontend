import { SettingsIcon } from "@/common/icons/SettingsIcon"
import { ActionButtonWrapper } from "../admin-status-actions/AdminStatusActions"
import { useState } from "react";
import { InputDropdown } from "../input-dropdown";
import { CV_ACTIONS } from "@/common/constants";

export const AdminCvActions = () => {
    const [open, setOpen] = useState(false);
    return <div className="relative"> 
        <ActionButtonWrapper label={'CV'} icon={<SettingsIcon />}
        // Don't need to open cv actions
            onCLick={() => setOpen(!true)}></ActionButtonWrapper> 
        {open &&
            <div className="absolute top-0 left-0">
                <InputDropdown
                    label={'CV'}
                    onClose={() => setOpen(false)}
                    onChange={(values) => console.log(values)}
                    options={CV_ACTIONS}
                    multiple={true}
                    styles={{ width: '240px' }} />
            </div>
        }
    </div>
}
