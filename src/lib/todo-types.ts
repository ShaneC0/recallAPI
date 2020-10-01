import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class todoInput {
    @Field()
    @Length(1, 255)
    task: string;

    @Field()
    @Length(1, 255)
    description: string;

    @Field()
    projectId: number;
}

@InputType()
export class updateTodoInput {
    @Field({ nullable: true })
    @Length(1, 255)
    task?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    description?: string;
}