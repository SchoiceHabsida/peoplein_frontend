'use client'

import { FC } from "react"
import './styles.css';
import { Navigation } from "../navigation";
import { Filter } from "../filter";
import { useAuth } from "@/common/components/auth";

export const Sidebar: FC = () => {
    const { user } = useAuth() as any
    return <div className="sidebar mt-20">
        <div className="company-logo rounded flex items-center justify-center text-xl">
            {user?.company?.name}
        </div>
        <Navigation/>
        <Filter/>
    </div>
}