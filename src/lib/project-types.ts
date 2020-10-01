import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class projectInput {
  @Field()
  @Length(1, 20)
  title: string;

  @Field()
  @Length(2, 255)
  description: string;
}

@InputType()
export class updateProjectInput {
  @Field({ nullable: true })
  @Length(1, 20)
  title?: string;

  @Field({ nullable: true })
  @Length(2, 255)
  description?: string;
}
