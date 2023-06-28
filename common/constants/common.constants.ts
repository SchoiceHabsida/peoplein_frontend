export enum ApplicantQueryTypes {
    search = 'getAllApplicantsPaged',
    favorites = 'getAllFavouriteApplicants',
    interviews = 'getAllScheduledForInterview',
    filter = 'searchApplicantsByCriteria'
}

export enum ApplicantPageTypes {
    search = 'search',
    favorites = 'favorites',
    interviews = 'interviews'
}

export enum Specializations {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND'
}

export enum ROLES {
    ADMIN = "ROLE_ADMIN",
    COMPANY = "ROLE_COMPANY"
}

export const MAX_FILE_SIZE = 50 * 8 * 1024 * 1024 // 50 MB