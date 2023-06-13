import { ISkills } from "./applicants.model"

export interface ICompany {
    id?: string,
    name: string,
    address: string,
    hrManager: string
    phoneNumber: string,
    skills?: ISkills[],
    email?: string,
    favoriteApplicants?: {lastName: string, firstName: string }[]
}