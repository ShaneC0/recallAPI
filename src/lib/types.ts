import { IsEmail, IsFQDN, Length } from "class-validator";
import { Request, Response } from "express";
import { Field, InputType } from "type-graphql";

@InputType()
export class authInput {
  @Field()
  @Length(2, 75)
  name?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8)
  password: string;
}

@InputType()
export class bookmarkInput {
  @Field()
  @Length(2, 75)
  name: string;

  @Field()
  @IsFQDN()
  url: string;
}

@InputType()
export class updateBookmarkInput {
  @Field({ nullable: true })
  @Length(2, 75)
  name?: string;

  @Field({ nullable: true })
  @IsFQDN()
  url?: string;
}

export type myContext = {
  req: Request & { session: Express.Session };
  res: Response;
};
