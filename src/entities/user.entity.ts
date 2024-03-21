import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entitiy';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @Property()
  @ApiProperty()
  email!: string;
  @Property({ nullable: true })
  @ApiProperty({nullable: true})
  weight?: number;
  @Property({ nullable: true })
  @ApiProperty({nullable: true})
  height?: number;
  @Property({ hidden: true })
  @ApiProperty({nullable: true})
  password!: string;
}
