import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Bookmark {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 200 })
  name: string;

  @Field()
  @Column("text")
  url: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}
