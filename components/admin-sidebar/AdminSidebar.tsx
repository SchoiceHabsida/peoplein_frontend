'use client'

import { FC } from "react"
import { AdminNavigation } from "../admin-navigation"
import { SidebarActions } from "../sidebar-actions"

export const AdminSidebar: FC = () => {
    const styles = {
        sidebarBottom: {
            height: '157px',
            borderTop: '1px solid #DEE2E6'
        },
    }
    return <div className="admin-sidebar flex flex-col justify-between h-full">
        <div className="nav-wrapper">
            <AdminNavigation />
        </div>
        <div className="sidebar-bottom" style={styles.sidebarBottom}>
            <SidebarActions />
        </div>
    </div>
}