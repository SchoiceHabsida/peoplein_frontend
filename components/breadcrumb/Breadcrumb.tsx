import { FC } from "react";

import './styles.css';

export const Breadcrumb: FC = () => {
    return <div className="breadcrumb rounded flex items-center text-base font-medium">
        <div className="routes ml-3">
            <span className="active-route route">Home</span>
            <span> / </span>
            <span className="active-route route">Search</span>
            <span> / </span>
            <span className="route">Result</span>
        </div>
    </div>
}