import { ISkills } from "./applicants.model"

export interface ICompany {
    id?: string,
    name: string,
    address: string,
    phoneNumber: string,
    hrManager: string,
    registrationNumber?: string,
    email?: string,
    website?: string,
    foundedAt?: string,
    preferredVisas?: any[],
    requiredSkills?: ISkills[],
    logo?: ILogo,
    banner?: ILogo, 
    favoriteApplicants?: {lastName: string, firstName: string }[],
    createdAt?: string,
}

export interface ILogo {
    id: string,
    type: string,
    path: string
}