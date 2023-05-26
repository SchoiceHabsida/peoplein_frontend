import { FC } from "react";
import Image from 'next/image';
import './styles.css';

export const Header: FC = () => {
    return <div className="header">
        <div className="h-20 header-top">
            <div className="header__content content-x-space flex items-center justify-between h-full">
                <div className="header__logo">
                    <Image
                        src="/main-logo.svg"
                        width={167}
                        height={34}
                        alt="peoplein-logo"
                    />
                </div>
                <div className="header__languages flex gap-8">
                    <button className="text-lg language-btn">EN</button>
                    <button className="text-lg language-btn">KR</button>
                </div>
            </div>
        </div>
        <div className="header__banner flex items-center">
            <div className="content-x-space w-96">
                <h1 className="font-bold text-40">Hire motivated foreign developers</h1>
            </div>
        </div>
    </div>
}