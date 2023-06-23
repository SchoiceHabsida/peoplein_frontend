import React from "react";
import { FC } from "react";

interface IContentHeaderProps {
    children: React.ReactNode;
    label: string;
}

export const ContentHeader: FC<IContentHeaderProps> = ({ children, label }) => {

    const [breadcrumb, filters] = React.Children.toArray(children);

    return (
        <div className="flex items-center justify-between mt-14 ml-6">
            <div className="">
                <div className="content-label text-4xl font-bold">{label}</div>
                <div className="-ml-3">
                    {breadcrumb}
                </div>
            </div>
            <div className="">
                <div className="">
                    {filters}
                </div>
            </div>
        </div>
    );
}