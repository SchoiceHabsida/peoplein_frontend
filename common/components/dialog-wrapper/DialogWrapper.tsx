import { FC } from "react";

import './styles.css';
import { CloseIcon } from "@/common/icons/CloseIcon";

interface IDialogProps {
    children: React.ReactNode;
    onClose: () => void
}

export const DialogWrapper: FC<IDialogProps> = ({children, onClose}) => {
    return <div className="dialog-wrapper  w-screen h-screen ">
        <div className="dialog-container bg-white">
            <div className="dialog-header">
                <button onClick={() => onClose()}>
                    <CloseIcon/>
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
}