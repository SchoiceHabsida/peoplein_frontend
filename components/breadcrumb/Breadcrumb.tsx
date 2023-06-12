'use client'
import { usePathname } from "next/navigation";

import { FC } from "react";

import './styles.css';
import Link from "next/link";

export const Breadcrumb: FC<{with_bg?: boolean}> = ({with_bg = true}) => {
    const currentUrl = usePathname();
    const currentRotes = currentUrl.split('/');

    const getPath = (index: number) => currentUrl.split('/').slice(0, index + 1).join('/')

    const createRoutes = () => {
        currentRotes
        const routes: any = []
        for(let i = 1; i <= currentRotes.length; i++){
            if(i === 1) {
                routes.push(<Link key={i} href={getPath(i)} className="active-route">Home</Link>)
            } else {
                routes.push(<Link key={i} href={getPath(i)} className={i !== currentRotes.length - 1 ? 'active-route capitalize': 'capitalize'}>
                    {currentRotes[i]}</Link>)
            }

            if(i < currentRotes.length - 1) {
                routes.push(<span key={i+10}> / </span>)
            }
        }
        return routes;
    }

    return <div className={`${with_bg? 'breadcrumb-bg': ''} breadcrumb rounded flex items-center text-base font-medium`}>
        <div className="routes ml-3">
            {createRoutes()}
        </div>
    </div>
}