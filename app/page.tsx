'use client';

import { useAuth } from "@/common/components/auth";
import { ROUTE_LOGIN } from "@/common/constants";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth() as any;
  const router = useRouter();
  useEffect(() => {
    if(!user) {
      router.push(ROUTE_LOGIN);
    }
  }, [user])
  return (
    <div>Home</div>
  )
}
