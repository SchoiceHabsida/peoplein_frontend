'use client'

import { FC } from "react";
import './styles.css';

export const Navigation: FC = () => {
    return <div className="navigation rounded mt-4 py-2">
        <div className="nav-item nav-title uppercase text-xs py-2 px-4 font-semibold">
            navigation
        </div>
        <div className="nav-item text-sm nav-active py-2 px-4 font-semibold">
            Search
        </div>
        <div className="nav-item text-sm py-2 px-4 font-semibold">
            Favorites
        </div>
        <div className="nav-item text-sm py-2 px-4 font-semibold">
            Interviews
        </div>
        <div className="nav-item text-sm sign-out py-2 px-4 font-semibold">
            Sign Out
        </div>
    </div>
}