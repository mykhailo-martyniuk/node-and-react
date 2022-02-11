import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Group } from './Group';

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  unique: true })
  user_name: string;

  @Column({type: 'timestamptz'})
  created: Date;

  @Column({  unique: true })
  email: string;


  @ManyToMany(type  => Group, group => group.users)
  @JoinTable()
  groups: Group[];

}
