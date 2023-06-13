"use client"

import React, { FC, useState } from "react";

export interface IAdminFilters { keyword: string, setKeyword: (keyword: string) => void }

export const AdminFiltersContext = React.createContext<IAdminFilters | null>(null)

export const AdminFiltersProvider: FC<any> = ({children}) => {
    const [keyword, setKeyword] = useState<string>('');
    return <AdminFiltersContext.Provider value={{keyword, setKeyword}}>
        {children}
    </AdminFiltersContext.Provider>
}