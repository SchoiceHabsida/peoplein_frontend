'use client'

import { FC, useContext, useEffect } from "react";
import './styles.css';
import { SearchIcon } from "@/common/icons/SearchIcon";
import { useRouter, usePathname } from "next/navigation";
import { ROUTE_RESULTS } from "@/common/constants";
import { ISearchProvider, SearchContext } from "@/common/providers";

export const Searchbar: FC = () => {
    const currentUrl = usePathname();
    const router = useRouter();
    const { keyword, setKeyword } = useContext(SearchContext) as ISearchProvider;

    useEffect(() => {
        if(!keyword.length) {
            router.push(currentUrl.split('/').slice(0, 3).join('/'));
        }
    }, [keyword])

    const onSearch = () => {
        router.push(`${currentUrl.split('/').slice(0, 3).join('/')}/${ROUTE_RESULTS}`);
    }

    return <div className="searchbar rounded">
        <div className="searchbar-content">
            <div className="search flex items-center">
                <SearchIcon />
                <div className="ml-6 mr-1.5">
                    <input value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="search-input"
                        placeholder="Search"></input>
                </div>
                <div>
                    <button
                        className="search-btn rounded cursor-pointer"
                        disabled={!keyword.length}
                        onClick={onSearch}
                    >Search</button>
                </div>
            </div>
            {/* <div className="search-results">6600+Results for "{keyword}"</div> */}
        </div>
    </div>
}