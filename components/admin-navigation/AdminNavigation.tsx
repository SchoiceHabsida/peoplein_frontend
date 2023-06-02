'use client'

import { DownIcon } from "@/common/icons/DownIcon";
import { FC } from "react";

export const AdminNavigation: FC = () => {

    const styles = {
        labelColor: {
            color: '#101828'
        },
        activeLink: {
            background: '#F0F5FF'
        },
        divider: {
            borderBottom: '1px solid #E4E7EC'
        }
    }

    return <div className="ml-8 mt-9" style={styles.labelColor}>
        <div className="nav-title flex items-center gap-2 h-10">
            <div><DownIcon/></div>
            <div className="font-bold">Contacts</div>
        </div>
        <nav className="ml-6 pb-4" style={styles.divider}>
            <ul>
                <li className="h-10" style={styles.activeLink} >
                    <a className="leading-10 inline-block ml-4">People</a>
                </li>
                <li className="h-10">
                    <a className="leading-10 inline-block ml-4">Company</a>
                </li>
            </ul>
        </nav>
    </div>
}