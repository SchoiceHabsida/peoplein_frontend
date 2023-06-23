import { gql } from "@apollo/client";

export const GET_APPLICANT_BY_ID = gql`
    query getApplicant ($id: ID!) {
        getApplicantById (id: $id) {
            id
            profilePicture {
                id
                path
                type
            }
            resume {
                id
                path
                type
            }
            firstName
            lastName
            country
            gender
            visa
            specialization
            dateOfBirth
            degree
            yearsOfExperience
            resumeGoogleDrivePath
            languages {
                languageName
            }
            skills {
                skillName
                skillType
            }
            experience {
                id
                company
                startOfWork
                endOfWork
                details
                yearsWorked
            }
            certificates {
                id
                certificateName
                acquisitionDate
                expiryDate
            },
            email
            description
        }
    }
`