import { InputType, Field } from "type-graphql";
import { IsEmail, IsFQDN, Length } from "class-validator";
import { Request, Response } from "express";

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
  @Field({nullable: true})
  @Length(2, 75)
  name?: string;

  @Field({nullable: true})
  @IsFQDN()
  url?: string;
}

export type myContext = {
  req: Request & { session: Express.Session },
  res: Response
}

