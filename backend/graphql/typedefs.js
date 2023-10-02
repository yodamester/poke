const { gql } = require('apollo-server-express')

const typedefs = gql`  
  type Query {
    pokemons(limit: Int!, offset: Int!): [Pokemon]
  }

  type Pokemon {
    id: Int
    name: String
    img: String
    abilities: [Ability]
    weight: Int
    height: Int
    stats: [Stat]
    voteCount: Int
  }
  
  type Ability {
    name: String
  }
  
  type Stat {
    name: String
    value: Int
  }
`;

module.exports = typedefs;