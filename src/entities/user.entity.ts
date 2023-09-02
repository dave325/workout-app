import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entitiy';

@Entity()
export class User extends BaseEntity {
  @Property()
  email!: string;
  @Property({ nullable: true })
  weight?: number;
  @Property({ nullable: true })
  height?: number;
  @Property({ hidden: true })
  password!: string;
}
