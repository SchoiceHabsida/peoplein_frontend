'use client'

import { FC } from "react"
import './styles.css';
import { Navigation } from "../navigation";
import { Filter } from "../filter";

export const Sidebar: FC = () => {
    return <div className="sidebar mt-20">
        <div className="company-logo rounded flex items-center justify-center text-xl">
            Company Name
        </div>
        <Navigation/>
        <Filter/>
    </div>
}