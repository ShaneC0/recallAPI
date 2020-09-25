import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { bookmarkResolver } from "./resolvers/bookmark";
import { userResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import "dotenv-safe/config";
import helmet from "helmet";

const main = async () => {
  await createConnection(config);

  const app = express();

  const redisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(helmet())

  app.use(
    session({
      name: "qid",
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new redisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "lax",
        secure: false,
        httpOnly: true,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, bookmarkResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
  });

  apolloServer.applyMiddleware({ app });

  app.listen(8000, () => {
    console.log("Server listening on localhost:8000");
  });
};

main();
