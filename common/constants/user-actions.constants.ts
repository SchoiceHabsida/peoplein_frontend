import { IAdminFilter } from "./admin-filters.constants";

export enum applicantStatusEnum {
    IN_PROJECT = "IN_PROJECT",
    SEARCHING = "SEARCHING",
    EMPLOYED = "EMPLOYED"
}

export const STATUS_ACTIONS: IAdminFilter[] = [
    {
        label: '',
        value: 'STATUS',
        children: [
            {
                label: 'Searching',
                value: applicantStatusEnum.SEARCHING
            },
            {
                label: 'Employed',
                value: applicantStatusEnum.EMPLOYED
            },
            {
                label: 'In project',
                value: applicantStatusEnum.IN_PROJECT
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