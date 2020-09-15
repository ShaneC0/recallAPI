import { ConnectionOptions } from "typeorm"
import { User } from "./entity/User"
import { Bookmark } from "./entity/Bookmark"
require("dotenv").config()

export default {
    "type": process.env.TYPEORM_CONNECTION,
    "host": process.env.TYPEORM_HOST,
    "port": process.env.TYPEORM_PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "synchronize": true,
    "logging": true,
    "entities": [User, Bookmark]
} as ConnectionOptions