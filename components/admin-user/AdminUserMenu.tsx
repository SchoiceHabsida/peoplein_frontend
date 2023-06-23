'use client'
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/common/components/auth"
import { AvatarIcon } from "@/common/icons/AvatarIcon"
import { ROUTE_CHANGE_PASSWORD } from "@/common/constants"

const styles = {
    actionContent: {
        marginRight: '36px',
    },
    addAction: {
        width: '211px',
        height: '55px',
        background: '#FEFEFE',
        borderRadius: '4px',
        color: "#101828"
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
export const AdminUserMenu = () => {
    const [open, setOpen] = useState(false)
    const { user } = useAuth() as any;

    return <div className="flex items-center gap-6" style={styles.actionContent}>
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex text-white gap-4 items-center justify-center"
                style={styles.addAction}>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                    style={styles.addIcon} >
                    <AvatarIcon />
                </div>
                <span className="capitalize">{user.username}</span>
            </button>
            {
                open && <div className="absolute top-0 -left-3">
                    <AddEntity onClose={() => setOpen(false)} />
                </div>
            }
        </div>
    </div>
}

const AddEntity: FC<{ onClose: () => void }> = ({ onClose }) => {

    const router = useRouter();
    const { logout } = useAuth() as any;

    const navigate = (path: string) => {
        onClose();
        // router.push(`${ROUTE_ADMIN}${path}`);
    }

    return <div className="w-60 bg-white rounded " style={styles.actionMenu}>
        <div className="mt-1">
            <button
                onClick={() => navigate(ROUTE_CHANGE_PASSWORD)}
                className="h-10 w-full flex items-center mb-1 mx-4">Change Password</button>
            <button
                onClick={() => {logout(true); onClose()}}
                className="h-10 w-full font-semibold flex items-center px-4"
                style={styles.companyColor}>Log out</button>
        </div>
    </div>
}