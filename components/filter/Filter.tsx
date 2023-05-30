import { FC } from "react";
import './styles.css'

export const Filter: FC = () => {
    return <div className="filter">
        <div className="filter-title text-base">Filter</div>
        <div className="flex flex-col gap-4">
            <select className="w-full outline-none filter-select">
                <option disabled selected>Specialization</option>
            </select>
            <select className="w-full outline-none filter-select">
                <option disabled selected>Languages</option>
            </select>
            <select className="w-full outline-none filter-select">
                <option disabled selected>Experience</option>
            </select>
            <select className="w-full outline-none filter-select">
                <option disabled selected>Foreign languages</option>
                <option>Option first</option>
            </select>
        </div>
    </div>
}