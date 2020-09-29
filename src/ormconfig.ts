import "dotenv-safe/config";
import { ConnectionOptions } from "typeorm";
import { Bookmark } from "./entity/Bookmark";
import { Project } from "./entity/Project";
import { User } from "./entity/User";

export default {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  entities: [Project, User, Bookmark],
} as ConnectionOptions;
