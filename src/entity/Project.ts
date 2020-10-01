import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany
} from "typeorm";
import { Bookmark } from "./Bookmark";
import { Todo } from "./Todo";
import { User } from "./User";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field(() => ID)
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projects)
  user!: User;

  @Field(() => [Bookmark])
  @OneToMany(() => Bookmark, bookmark => bookmark.project)
  bookmarks!: Bookmark[]

  @Field(() => [Todo])
  @OneToMany(() => Todo, todo => todo.project)
  todos!: Todo[]
}