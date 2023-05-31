"use client"

import React, { FC, useState } from "react";
import { IFilters } from "../components/models/applicants.model";

export interface IFilterContext { input: IFilters, setInput: (value: IFilters) => void }

export const FilterContext = React.createContext<IFilterContext | null>(null)


export const FilterProvider: FC<any> = ({children}) => {
    const [input, setInput] = useState<IFilters>({});

    return <FilterContext.Provider value={{input, setInput}}>
        {children}
    </FilterContext.Provider>
}