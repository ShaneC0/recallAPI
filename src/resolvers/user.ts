import argon2 from "argon2";
import { myContext } from "../index";
import { authInput } from "../lib/user-types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

@Resolver(User)
export class userResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: myContext) {
    if (req.session.userId) {
      return User.findOne(req.session.userId, { relations: ["projects"] });
    } else {
      return null;
    }
  }

  @Mutation(() => User)
  async register(
    @Arg("options") options: authInput,
    @Ctx() { req }: myContext
  ): Promise<User> {
    const existingUser = await User.findOne({ email: options.email });
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      const hashedPassword = await argon2.hash(options.password);
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ ...options, password: hashedPassword })
        .returning("*")
        .execute();

      req.session.userId = result.raw[0].id;
      return { ...result.raw[0] };
    }
  }

  @Mutation(() => User)
  async login(
    @Arg("options") options: authInput,
    @Ctx() { req }: myContext
  ): Promise<User> {
    const existingUser = await User.findOne({ email: options.email });
    if (!existingUser) {
      throw new Error("User doesn't exist");
    } else {
      if (await argon2.verify(existingUser.password, options.password)) {
        req.session.userId = existingUser.id;
        return existingUser;
      } else {
        throw new Error("Incorrect password");
      }
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: myContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
