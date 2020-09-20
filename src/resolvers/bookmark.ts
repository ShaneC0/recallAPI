import { Bookmark } from "../entity/Bookmark";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { bookmarkInput, myContext, updateBookmarkInput } from "../lib/types";
import { User } from "../entity/User";

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
  async createBookmark(
    @Arg("options") options: bookmarkInput,
    @Ctx() { req }: myContext
  ): Promise<Bookmark> {
    if (!req.session.userId) {
      throw new Error("Must be logged in to create bookmark");
    } else {
      const currentUser = await User.findOne({id: req.session.userId})
      return Bookmark.create({ ...options, user: currentUser}).save();
    }
  }

  @Mutation(() => Bookmark)
  async updateBookmark(
    @Arg("options") options: updateBookmarkInput,
    @Arg("id") id: number
  ): Promise<Bookmark> {
    const updatingBookmark = await Bookmark.findOne({ id });
    if (!updatingBookmark) {
      throw new Error("Bookmark doesn't exist");
    } else {
      await Bookmark.update(id, { ...options });
      const updatedBookmark = await Bookmark.findOne({ id });
      if (!updatedBookmark) {
        throw new Error("Error updating bookmark");
      } else {
        return updatedBookmark;
      }
    }
  }

  @Mutation(() => Boolean)
  async deleteBookmark(@Arg("id") id: number): Promise<Boolean> {
    const deletingBookmark = await Bookmark.findOne({ id });
    if (!deletingBookmark) {
      throw new Error("Bookmark doesn't exist");
    } else {
      await Bookmark.delete({ id });
      return true;
    }
  }
}
