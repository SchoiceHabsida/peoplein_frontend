'use client'
import { FC } from "react";
import './styles.css'
import { AdminUserMenu } from "../admin-user";
import { useAuth } from "@/common/components/auth";

export const AdminHeader: FC = () => {
    const { user } = useAuth() as any;
    return <div className="admin-header flex">
        <div className="admin-logo flex items-center justify-center h-full">peoplein</div>
        <div className="admin-banner grow h-full flex items-center justify-end">
            {user && <AdminUserMenu/>}
        </div>
    </div>
}