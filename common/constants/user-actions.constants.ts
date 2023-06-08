import { IAdminFilter } from "./admin-filters.constants";

export const STATUS_ACTIONS: IAdminFilter[] = [
    {
        label: '',
        value: 'STATUS',
        children: [
            {
                label: 'Active',
                value: 'active'
            },
            {
                label: 'InActive',
                value: 'inactive'
            },
            {
                label: 'Delete',
                value: 'delete'
            }
        ]
    }
]

export const CV_ACTIONS: IAdminFilter[] = [
    {
        label: '',
        value: 'CV',
        children: [
            {
                label: 'Open',
                value: 'open'
            },
            {
                label: 'Download',
                value: 'download'
            },
            {
                label: 'Delete',
                value: 'delete'
            }
        ]
    }
]