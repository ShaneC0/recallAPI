import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { bookmarkResolver } from "./resolvers/bookmark";
import { userResolver } from "./resolvers/user";

const main = async () => {
  await createConnection(config);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, bookmarkResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(8000, () => {
    console.log("Server listening on localhost:8000");
  });
};

main();
