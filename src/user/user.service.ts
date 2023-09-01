import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  findUserByID(id: number) {
    console.log('here');
    return this.em.findOne(User, id);
  }

  async createUser(user: Omit<User, 'createdAt' | 'updatedAt'>) {
    const existingUser = await this.userRepository.findOne({
      email: user.email,
    });
    if (existingUser) {
      return { error: 'User already exists' };
    }
    const createdUserResponse = await this.userRepository.create(user);
    await this.em.flush();
    return createdUserResponse;
  }

  updateUser(userId: number, user: Pick<User, 'email' | 'weight' | 'height'>) {
    return this.userRepository.nativeUpdate(
      { id: userId, deletedOn: null },
      { ...user, updatedAt: new Date() },
    );
  }

  deletedUser(userId: number) {
    const currentDate = new Date();
    return this.userRepository.nativeUpdate(
      {
        id: userId,
        deletedOn: null,
      },
      { deletedOn: currentDate, updatedAt: currentDate },
    );
  }
}
