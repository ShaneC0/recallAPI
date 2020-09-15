import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bookmark } from "./Bookmark";
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 75 })
  name: string;

  @Field()
  @Column("text")
  email: string;

  @Column()
  password: string;

  @Field(() => [Bookmark])
  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
