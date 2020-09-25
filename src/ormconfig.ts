import "dotenv-safe/config";
import { ConnectionOptions } from "typeorm";
import { Bookmark } from "./entity/Bookmark";
import { User } from "./entity/User";

export default {
  type: "postgres",
  url: process.env.TYPEORM_URL,
  synchronize: true,
  entities: [User, Bookmark],
} as ConnectionOptions;
