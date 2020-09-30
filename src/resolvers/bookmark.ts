import { Bookmark } from "../entity/Bookmark";
import { Query, Arg, Resolver } from "type-graphql";

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
}
