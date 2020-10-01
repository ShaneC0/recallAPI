import { Bookmark } from "../entity/Bookmark";
import { Query, Arg, Resolver, Ctx, Mutation } from "type-graphql";
import { bookmarkInput, updateBookmarkInput } from "../lib/bookmark-types";
import { myContext } from "../index";

@Resolver(Bookmark)
export class bookmarkResolver {
  @Query(() => [Bookmark])
  bookmarks(): Promise<Bookmark[]> {
    return Bookmark.find();
  }

  @Query(() => Bookmark, { nullable: true })
  bookmark(@Arg("id") id: number): Promise<Bookmark | undefined> {
    return Bookmark.findOne(id);
  }

  @Mutation(() => Bookmark)
  createBookmark(
    @Arg("options") options: bookmarkInput,
    @Ctx() { req }: myContext
  ): Promise<Bookmark> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    return Bookmark.create({ ...options }).save();
  }

  @Mutation(() => Bookmark)
  async updateBookmark(
    @Arg("id") id: number,
    @Arg("options") options: updateBookmarkInput,
    @Ctx() { req }: myContext
  ): Promise<Bookmark | undefined> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Bookmark.update(id, { ...options });
    return Bookmark.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteBookmark(
    @Arg("id") id: number,
    @Ctx() { req }: myContext
  ): Promise<Boolean> {
    if (!req.session.userId) {
      throw new Error("Not Authorized");
    }
    await Bookmark.delete(id);
    return true; 
  }
}
