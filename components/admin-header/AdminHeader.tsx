import { FC } from "react";
import './styles.css'

export const AdminHeader: FC = () => {
    return <div className="admin-header flex">
        <div className="admin-logo flex items-center justify-center h-full">peoplein</div>
        <div className="admin-banner grow h-full flex items-center justify-end"></div>
    </div>
}