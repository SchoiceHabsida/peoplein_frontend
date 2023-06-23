'use client'

import { ROUTE_ADMIN, ROUTE_COMPANIES, ROUTE_DASHBOARD, ROUTE_PEOPLE } from "@/common/constants";
import { DownIcon } from "@/common/icons/DownIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const AdminNavigation: FC = () => {
    const currentUrl = usePathname();
    const routes = currentUrl.split('/');
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

    const navItems = [
        {
            label: 'People',
            path: ROUTE_PEOPLE
        },
        {
            label: 'Company',
            path: ROUTE_COMPANIES
        },
    ]

    return <div className="ml-8 mt-9" style={styles.labelColor}>
        <div className="nav-title flex items-center gap-2 h-10">
            <div><DownIcon /></div>
            <div className="font-bold">Contacts</div>
        </div>
        <nav className="ml-6 pb-4" style={styles.divider}>
            <ul>
                {navItems.map(item => <li className="h-10" key={item.path}
                    style={routes.includes(item.path) ? styles.activeLink : {}} >
                    <Link
                        href={`${ROUTE_ADMIN}${ROUTE_DASHBOARD}/${item.path}`}
                        className="leading-10 inline-block ml-4 w-full">{item.label}</Link>
                </li>)}
            </ul>
        </nav>
    </div>
}