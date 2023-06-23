// 'use client'

import { useAuth } from "@/common/components/auth";
import { ROUTE_ADMIN, ROUTE_LOGIN} from "@/common/constants";
import { AdminFiltersProvider } from "@/common/providers"
import { AdminHeader } from "@/components/admin-header"
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user, loading } = useAuth() as any;
  // const router = useRouter();
  // useEffect(() => {    
  //   if (!user && !loading) {
  //     router.push(`${ROUTE_ADMIN}/${ROUTE_LOGIN}`);
  //   }
  // })

  
  return (
    <AdminFiltersProvider>
      <div >
        <AdminHeader />
        {children}
      </div>
    </AdminFiltersProvider>
  )
}
