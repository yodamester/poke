const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');

const app = express();
const port = 4000;

let pokeArray = [];

app.use(cors({
    origin: 'http://localhost:4200'
  }));

app.get("/getPokemons", (req, res) => {
    try {
        getPokemons().then(data => {
            return res.status(200).send(data);
        });
    } catch (err) {
        console.log(err);
  }
});

const typeDefs = gql`  
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

const resolvers = {
    Query: {
        pokemons: (parent, args) => getPokemons(args.limit, args.offset)
    },
    Pokemon: {
        id: (parent) => parent.id,
        name: (parent) => parent.name,
        img: (parent) => parent.sprites.front_default,
        abilities: (parent) => parent.abilities,
        weight: (parent) => parent.weight,
        height: (parent) => parent.height,
        stats: (parent) => parent.stats,
        voteCount: () => 0
    },
    Ability: {
        name: (parent) => parent.ability.name
    },
    Stat: {
        name: (parent) => parent.stat.name,
        value: (parent) => parent.base_stat
    }
  };

async function getPokemons(limit, offset) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset);
    const data = await response.json();
    for (const pokemon of data.results) {  
        const pokemon2 = await fetch(pokemon.url);
        const data2 = await pokemon2.json();
        pokeArray.push(data2);
    }
    return pokeArray;
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/api' });
    app.listen({ port }, () =>
        console.log(
        `Server running at http://localhost:${port}`
    )
    );
}
startServer();
