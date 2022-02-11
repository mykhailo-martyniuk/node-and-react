import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity("group")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;


  @ManyToMany(type  => User, user => user.groups,   {cascade: true})
  @JoinTable()
  users: User[];

}
