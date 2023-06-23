'use client'
import { ROUTE_ADD, ROUTE_ADMIN, ROUTE_COMPANIES, ROUTE_DASHBOARD, ROUTE_PEOPLE } from "@/common/constants"
import { AvatarPlusIcon } from "@/common/icons/AvatarPlusIcon"
import { SettingsIcon } from "@/common/icons/SettingsIcon"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"

const styles = {
    actionContent: {
        marginTop: '22px',
        marginRight: '30px',
        marginLeft: '30px',
    },
    addAction: {
        width: '211px',
        height: '55px',
        background: '#1A1A1A',
        borderRadius: '4px',
    },
    addIcon: {
        background: '#EFEFEF'
    },
    companyColor: {
        color: '#BB251A',
        borderTop: '1px solid #E4E7EC'
    },
    actionMenu: {
        border: "1px solid #E4E7EC",
        boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
        borderRadius: '4px'
    }
}
export const SidebarActions = () => {
    const [open, setOpen] = useState(false)

    return <div className="flex items-center gap-6" style={styles.actionContent}>
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex text-white gap-4 items-center justify-center"
                style={styles.addAction}>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                    style={styles.addIcon} >
                    <AvatarPlusIcon />
                </div>
                <span>Add</span>
            </button>
            {
                open && <div className="absolute top-0 ">
                    <AddEntity onClose={() => setOpen(false)} />
                </div>
            }
        </div>
        <div>
            <button><SettingsIcon /></button>
        </div>
    </div>
}

const AddEntity: FC<{ onClose: () => void }> = ({ onClose }) => {

    const router = useRouter();

    const navigate = (path: string) => {
        onClose();
        router.push(`${ROUTE_ADMIN}${ROUTE_DASHBOARD}/${path}/${ROUTE_ADD}`);
    }

    return <div className="w-60 bg-white rounded " style={styles.actionMenu}>
        <div className="mt-1">
            <button onClick={() => navigate(ROUTE_PEOPLE)} className="h-10 w-full flex items-center mb-1 mx-4">People</button>
            <button onClick={() => navigate(ROUTE_COMPANIES)} className="h-10 w-full font-semibold flex items-center px-4" style={styles.companyColor}>Company</button>
        </div>
    </div>
}