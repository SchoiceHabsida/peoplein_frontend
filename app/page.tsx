'use client';

import { useAuth } from "@/common/components/auth";
import { ROUTE_APPLICANTS, ROUTE_LOGIN, ROUTE_SEARCH } from "@/common/constants";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth() as any;
  const router = useRouter();
  useEffect(() => {
    if(!user) {
      router.push(ROUTE_LOGIN);
    } else {
      router.push(`${ROUTE_APPLICANTS}/${ROUTE_SEARCH}`)
    }
  }, [user])
  return (
    <div></div>
  )
}
