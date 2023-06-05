export const ADMIN_FILTERS: IAdminFilter[] = [
    {
        label: "Visa",
        value: 'VISA',
        children: [
            {
                label: 'F4',
                value: 'F4'
            },
            {
                label: 'F2',
                value: 'F2'
            },
            {
                label: 'H2',
                value: 'H2'
            },
            {
                label: 'Business',
                value: 'business'
            },
            {
                label: 'None',
                value: 'none'
            }
        ]
    },
    {
        label: 'Profile Status',
        value: 'status',
        children: [
            {
                label: 'Active',
                value: 'active'
            },
            {
                label: 'InActive',
                value: 'inactive'
            }
        ]
    }
];

export const STATUS_FILTERS: IAdminFilter[] = [
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

export interface IAdminFilter {
    label: string,
    value: any,
    children?: IAdminFilter[]
}