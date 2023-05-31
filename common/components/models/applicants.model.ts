export interface IApplicant {
    id: any,
    firstName: string,
    lastName: string,
    country: string,
    gender: string,
    visa: string,
    dateOfBirth: string,
    profilePicture?: {
        path: string,
        type: string
    }
    degree: string,
    yearsOfExperience: number,
    resumeGoogleDrivePath : string,
    languages: ILanguage[],
    skills: ISkills[],
    experience: IExperience[],
    certificates: ICertificate[],
    specialization: string[]
}

export interface ICertificate {
    id: number,
    certificateName: string,
    acquisitionDate: string,
    expiryDate: string
}

export interface IExperience {
    id: string,
    company: string,
    startOfWork: string,
    endOfWOrk: string,
    details: string,
    yearsWorked: number
}

export interface ILanguage {
    languageName: string
}

export interface ISkills {
    skillName: string,
    skillType: SkillTypesEnum
}

export enum SkillTypesEnum {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND'
}

export interface IPageable<T> {
    currentPage: number,
    totalPages : number,
    totalElements : number,
    content: T[]
}

export interface IFilters {
    skillType?: SkillTypesEnum | 0,
    skillName?: string | 0,
    language?: string | 0,
    experience?: number | 0
} 