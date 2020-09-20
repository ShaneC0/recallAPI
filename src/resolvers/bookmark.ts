import { Bookmark } from "../entity/Bookmark";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { bookmarkInput } from "../lib/types";

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
  createBookmark(@Arg("options") options: bookmarkInput): Promise<Bookmark> {
    return Bookmark.create({ ...options }).save();
  }

  @Mutation(() => Bookmark)
  async updateBookmark(
    @Arg("options") options: bookmarkInput,
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
