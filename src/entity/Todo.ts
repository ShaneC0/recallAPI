import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  task!: string;

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
  projectId: number;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.todos)
  project!: Project
}