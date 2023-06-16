import { IApplicant, SkillTypesEnum } from "../components/models/applicants.model";
import { ICompany } from "../components/models/companies.model";
import { GENDERS_ENUM } from "./applicant.constants";
import { Specializations } from "./common.constants";

export const applicantsMock: IApplicant[] = [
    {
        firstName: "Kodir",
        lastName: "Amirov",
        certificates: [
            { certificateName: "TOPIC", }
        ],
        country: "Uzbekistan",
        degree: "Bachelor's",
        experience: [
            { company: 'Habsida', startOfWork: '2023' }
        ],
        gender: GENDERS_ENUM.MALE,
        languages: [{ languageName: 'English' }, { languageName: 'Russian' }],
        skills: [{ skillName: 'Javascript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'Typescript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'ReactJs', skillType: SkillTypesEnum.FRONTEND }],
        resumeGoogleDrivePath: '',
        specialization: [Specializations.FRONTEND],
        visa: 'D2',
        yearsOfExperience: 4,
        dateOfBirth: '12/15/1996',
        email: 'amirovqodir911@gmail.com',
        status: 'Hired',
        createdAt: '03.03.2023'
    },
    {
        firstName: "Kodir",
        lastName: "Amirov",
        certificates: [
            { certificateName: "TOPIC", }
        ],
        country: "Uzbekistan",
        degree: "Bachelor's",
        experience: [
            { company: 'Habsida', startOfWork: '2023' }
        ],
        gender: GENDERS_ENUM.MALE,
        languages: [{ languageName: 'English' }, { languageName: 'Russian' }],
        skills: [{ skillName: 'Javascript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'Typescript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'ReactJs', skillType: SkillTypesEnum.FRONTEND }],
        resumeGoogleDrivePath: '',
        specialization: [Specializations.FRONTEND],
        visa: 'D2',
        yearsOfExperience: 4,
        dateOfBirth: '12/15/1996',
        email: 'amirovqodir911@gmail.com',
        status: 'Hired',
        createdAt: '03.03.2023'
    },
    {
        firstName: "Kodir",
        lastName: "Amirov",
        certificates: [
            { certificateName: "TOPIC", }
        ],
        country: "Uzbekistan",
        degree: "Bachelor's",
        experience: [
            { company: 'Habsida', startOfWork: '2023' }
        ],
        gender: GENDERS_ENUM.MALE,
        languages: [{ languageName: 'English' }, { languageName: 'Russian' }],
        skills: [{ skillName: 'Javascript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'Typescript', skillType: SkillTypesEnum.FRONTEND },
        { skillName: 'ReactJs', skillType: SkillTypesEnum.FRONTEND }],
        resumeGoogleDrivePath: '',
        specialization: [Specializations.FRONTEND],
        visa: 'D2',
        yearsOfExperience: 4,
        dateOfBirth: '12/15/1996',
        email: 'amirovqodir911@gmail.com',
        status: 'Hired',
        createdAt: '03.03.2023'
    }
]


export const companiesMock: ICompany[] = [
    {
        address: 'Main stret 120',
        hrManager: 'Anna',
        name: "Company 1",
        phoneNumber: '+82 10256-56-56',
        createdAt: '02.02.20023',
        regNumber: '1231564654',
        email: 'company@email.com',
        favoriteApplicants: [{
            firstName: 'Kodir',
            lastName: 'Amirov'
        }]
    },
    {
        address: 'Main stret 120',
        hrManager: 'Anna',
        name: "Company 2",
        phoneNumber: '+82 10256-56-56',
        createdAt: '02.02.20023',
        regNumber: '1231564654'
    },
    {
        address: 'Main stret 120',
        hrManager: 'Anna',
        name: "Company 4",
        phoneNumber: '+82 10256-56-56',
        createdAt: '02.02.20023',
        regNumber: '1231564654'
    }
]