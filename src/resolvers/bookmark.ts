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
}
