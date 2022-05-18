import { gql } from '@apollo/client';

export const LOGIN = gql `
    mutation login($email: String!, $password: String!) {
        login(
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String! $password: String!) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(
        $bookId: String!
        $authors: [String]
        $image: String
        $description: String!
        $link: String
        $title: String!
    ) {  
        saveBook(
            bookId: $bookId
            authors: $authors
            image: $image
            description: $description
            link: $link
            title: $title
        ) {
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;