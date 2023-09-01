import { DateTimeType, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entitiy';
import { User } from './user.entity';

@Entity()
export class Workout extends BaseEntity {
  @Property()
  exercise!: string;
  @ManyToOne()
  user!: User;
  @Property()
  sets!: number;
  @Property()
  reps!: number;
}
