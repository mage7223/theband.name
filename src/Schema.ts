import { gql } from 'apollo-server-express';

const Schema = gql`
    type Band {
        id: ID!
        name: String
    }
    #handle user commands
    type Query {
        getAllBands : [Band] #will return multiple Person instances
        getBand(id: Int): Band # has an argument of 'id' of type Integer
    }
    `;

export default Schema;
