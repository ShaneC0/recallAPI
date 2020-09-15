import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig";

async function main() {
  const connection = await createConnection(config);
  console.log('hello');
}

main();
