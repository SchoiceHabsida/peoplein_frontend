import { FC } from "react";
import './styles.css';
import { SearchIcon } from "@/common/icons/SearchIcon";

export const Searchbar: FC = () => {
    return <div className="searchbar rounded">
        <div className="searchbar-content">
            <div className="search flex items-center">
                <SearchIcon/>
                <div className="ml-6 mr-1.5">
                    <input className="search-input" placeholder="Search"></input>
                </div>
                <div>
                    <button className="search-btn rounded">Search</button>
                </div>
            </div>
            <div className="search-results">6600+Results for "Search"</div>
        </div>
    </div>
}