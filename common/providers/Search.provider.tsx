"use client"

import React, { FC, useState } from "react";

export interface ISearchProvider { keyword: string, setKeyword: (keyword: string) => void }

export const SearchContext = React.createContext<ISearchProvider | null>(null)

export const SearchProvider: FC<any> = ({children}) => {
    const [keyword, setKeyword] = useState<string>('');
    return <SearchContext.Provider value={{keyword, setKeyword}}>
        {children}
    </SearchContext.Provider>
}