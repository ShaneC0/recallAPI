import { Todo } from "../entity/Todo";
import { Query, Arg, Resolver, Ctx, Mutation } from "type-graphql";
import { myContext } from "../index";
import { todoInput, updateTodoInput } from "../lib/todo-types";

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

  @Mutation(() => Todo)
  createTodo(
    @Arg("options") options: todoInput,
    @Ctx() { req }: myContext
  ): Promise<Todo> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    return Todo.create({ ...options }).save();
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Arg("id") id: number,
    @Arg("options") options: updateTodoInput,
    @Ctx() { req }: myContext
  ): Promise<Todo | undefined> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Todo.update(id, { ...options });
    return Todo.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("id") id: number,
    @Ctx() { req }: myContext
  ): Promise<Boolean> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Todo.delete(id);
    return true;
  }
}
