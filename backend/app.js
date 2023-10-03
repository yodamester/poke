const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
require("dotenv").config();

const app = express();
const port = 4000;

let pokeArray = [];

app.use(cors({
    origin: process.env.CORS_ORIGIN
  }));

const typeDefs = require('./graphql/typedefs.js');

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
    pokeArray = [];
    const response = await fetch(process.env.API_URL + 'pokemon?limit=' + limit + '&offset=' + offset);
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
