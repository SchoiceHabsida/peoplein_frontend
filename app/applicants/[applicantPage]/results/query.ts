import { gql } from "@apollo/client";

export const SEARCH_BY_KEYWORD = gql`
    query searchApplicants ($pageNumber: Int, $pageCount: Int, $keyword: String) {
        searchApplicantsByKeyword (pageNumber: $pageNumber, pageCount: $pageCount, keyword: $keyword) {
            content{
                id
                firstName
                lastName
                country
                gender
                visa
                dateOfBirth
                yearsOfExperience,
                profilePicture {
                    id
                    path
                    type
                }
                specialization
            }
        currentPage
        totalElements
        totalPages
        }
    }
`