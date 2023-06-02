import { AvatarPlusIcon } from "@/common/icons/AvatarPlusIcon"
import { SettingsIcon } from "@/common/icons/SettingsIcon"

export const SidebarActions = () => {

    const styles = {
        actionContent: {
            marginTop: '22px',
            marginRight: '30px',
            marginLeft: '30px',
        },
        addAction: {
            width: '211px',
            height: '55px',
            background: '#1A1A1A',
            borderRadius: '4px',
        },
        addIcon: {
            background: '#EFEFEF'
        }
    }

    return <div className="flex items-center gap-6" style={styles.actionContent}>
        <div>
            <button className="flex text-white gap-4 items-center justify-center" style={styles.addAction}>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                    style={styles.addIcon} >
                    <AvatarPlusIcon />
                </div>
                <span>Add</span>
            </button>
        </div>
        <div>
            <button><SettingsIcon /></button>
        </div>
    </div>
}