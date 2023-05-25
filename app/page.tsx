'use client';

import { ROUTE_LOGIN } from "@/common/constants";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(ROUTE_LOGIN);
  }, [])
  return (
    <div></div>
  )
}
