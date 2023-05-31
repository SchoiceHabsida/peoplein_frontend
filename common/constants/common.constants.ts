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