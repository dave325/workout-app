import { DateTimeType, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entitiy';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Workout extends BaseEntity {
  @Property()
  @ApiProperty()
  exercise!: string;
  @ManyToOne()
  user!: User;
  @Property()
  @ApiProperty()
  sets!: number;
  @Property()
  @ApiProperty()
  reps!: number;
}
