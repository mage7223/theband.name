import gql from 'graphql-tag';

const Schema = gql`
type Band {
    id: ID!
    name: String
}
type Query {
    getAllBands : [Band] #will return multiple Person instances
    getBand(id: Int): Band # has an argument of 'id' of type Integer
}

type Query {
    hello: String
}
    `;

export default Schema;
