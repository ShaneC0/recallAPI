import { ConnectionOptions } from "typeorm";
import { User } from "./entity/User";
import { Bookmark } from "./entity/Bookmark";
import "dotenv-safe/config";

export default {
  type: "postgres",
  url: process.env.TYPEORM_URL,
  synchronize: true,
  entities: [User, Bookmark],
} as ConnectionOptions;
