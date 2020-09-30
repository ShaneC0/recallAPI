import { Todo } from "../entity/Todo";
import { Query, Arg, Resolver } from "type-graphql";

@Resolver(Todo)
export class todoResolver {
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return Todo.find();
  }

  @Query(() => Todo, { nullable: true })
  todo(@Arg("id") id: number): Promise<Todo | undefined> {
    return Todo.findOne(id);
  }
}