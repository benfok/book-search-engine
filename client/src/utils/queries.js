import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getUser {
        user {
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                image
                description
                link
                title
            }
        }
    }
`;