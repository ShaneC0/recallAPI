import { Length, IsFQDN } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class bookmarkInput {
  @Field()
  @Length(2, 75)
  name: string;

  @Field()
  @IsFQDN()
  url: string;

  @Field()
  projectId: number;
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
