const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID
        user: User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        image: String
        description: String
        link: String
        title: String
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        login(
            email: String!
            password: String!
        ): Auth
        saveBook(
            bookId: String!
            authors: [String]
            image: String
            description: String!
            link: String
            title: String!
        ): User
        removeBook(
            bookId: String!
        ): User
    }
`;

module.exports = typeDefs;