import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import "dotenv-safe/config";
import express, { Request, Response } from "express";
import session from "express-session";
// import helmet from "helmet";
import redis from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import config from "./ormconfig";
import { bookmarkResolver } from "./resolvers/bookmark";
import { projectResolver } from "./resolvers/project";
import { userResolver } from "./resolvers/user";
import { todoResolver } from "./resolvers/todo";

export type myContext = {
  req: Request & { session: Express.Session };
  res: Response;
};

const main = async () => {
  await createConnection(config);

  const app = express();

  const redisStore = connectRedis(session);
  const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

  // app.use(helmet());

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
      resolvers: [
        userResolver,
        projectResolver,
        bookmarkResolver,
        todoResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "localhost:3000",
      credentials: true,
    },
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}/graphql`);
  });
};

main();
