import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

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
