import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { BookmarkResolver } from "./resolvers/bookmark";

const main = async () => {
  const connection = await createConnection(config);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookmarkResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ db: connection, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(8000, () => {
    console.log('Server listening on localhost:8000');
  })
}

main();
