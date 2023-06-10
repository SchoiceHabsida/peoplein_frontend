'use client'

import { useAuth } from "@/common/components/auth";
import { ROUTE_ADMIN, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_PEOPLE } from "@/common/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Admin() {
  const { user } = useAuth() as any;
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push(`${ROUTE_ADMIN}/${ROUTE_LOGIN}`);
    } else {
      router.push(`${ROUTE_ADMIN}/${ROUTE_DASHBOARD}/${ROUTE_PEOPLE}`)
    }
  })
  return (<div></div>)
}
