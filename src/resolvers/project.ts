import { Project } from "../entity/Project";
import { Query, Arg, Resolver, Mutation, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { myContext } from "../index";
import { projectInput, updateProjectInput } from "../lib/project-types";

@Resolver(Project)
export class projectResolver {
  @Query(() => [Project])
  projects(): Promise<Project[]> {
    return Project.find();
  }

  @Query(() => Project, { nullable: true })
  project(@Arg("id") id: number): Promise<Project | undefined> {
    return Project.findOne(id, { relations: ["bookmarks", "todos"] });
  }

  @Mutation(() => Project)
  async createProject(
    @Arg("options") options: projectInput,
    @Ctx() { req }: myContext
  ): Promise<Project> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    const user = await User.findOne({ id: req.session.userId });
    return Project.create({ ...options, user }).save();
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg("id") id: number,
    @Arg("options") options: updateProjectInput,
    @Ctx() { req }: myContext
  ): Promise<Project | undefined> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Project.update(id, { ...options });
    return Project.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id") id: number, @Ctx() { req }: myContext) {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Project.delete(id);
    return true;
  }
}
