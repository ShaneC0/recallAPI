import "dotenv-safe/config";
import { ConnectionOptions } from "typeorm";

export default {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  entities: ["entity/*"],
} as ConnectionOptions;
