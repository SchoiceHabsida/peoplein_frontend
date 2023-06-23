'use client';

import { useAuth } from "@/common/components/auth";
import { useRouter } from 'next/navigation';
import './styles.css';
import { LockIcon } from "@/common/icons/LockIcon";
import { ROUTE_ADMIN, ROUTE_APPLICANTS, ROUTE_LOGIN, ROUTE_SEARCH } from "@/common/constants";
import { useEffect } from "react";
import { ROLES } from "@/common/constants/common.constants";

export default function Home() {
  const { user } = useAuth() as any;
  const router = useRouter();
  useEffect(() => {
    if(user) {
      if(user.roles.some((role: {name: string}) => role.name === ROLES.ADMIN)) {
        router.push(ROUTE_ADMIN);
      } else {
        router.push(`${ROUTE_APPLICANTS}/${ROUTE_SEARCH}`)
      }
    }
  }, [user])
  const navigate = (path: string) => {
    router.push(path);
  }
  return (
    <div className="w-screen h-screen banner-bg-primary grid box-border">
      <div className="m-10 flex items-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="banner-left">
            <h1 className="banner-heading">Find your ideal
              developer</h1>
            <div className="banner-text mb-8">
              Get access to 50+ foreign developers across the various nationalities and skills.
              Only available for startups and SMEs based in Korea. Please fill up the form and get the invitation.
            </div>
            <div className="flex gap-5">
              <button onClick={() => navigate(`${ROUTE_LOGIN}`)} className="access-button">Get access</button>
              <button onClick={() => navigate(`${ROUTE_ADMIN}${ROUTE_LOGIN}`)}><LockIcon/></button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="banner-image">
          </div>
        </div>
      </div>
    </div>
  )
}
