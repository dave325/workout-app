import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { hash } from 'bcrypt';
@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  findUserByID(id: number) {
    return this.userRepository.findOne(id);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ email, deletedOn: null });
  }

  async createUser(user: Omit<User, 'createdAt' | 'updatedAt'>) {
    const existingUser = await this.userRepository.findOne({
      email: user.email,
    });
    if (existingUser) {
      return { error: 'User already exists' };
    }
    const password = await hash(user.password, 15);
    const createdUserResponse = await this.userRepository.create({
      ...user,
      password,
    });
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
