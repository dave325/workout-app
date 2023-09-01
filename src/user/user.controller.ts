import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async finduserByID(@Param('userId') userId: number) {
    console.log(userId);
    return await this.userService.findUserByID(userId);
  }

  @Post()
  async createWorkout(@Body() user: Omit<User, 'createdAt' | 'updatedAt'>) {
    const createdUserRequest = await this.userService.createUser(user);
    if ('error' in createdUserRequest) {
      throw new BadRequestException(createdUserRequest.error);
    }
    return createdUserRequest;
  }

  @Patch(':id')
  async updateWorkout(
    @Param('id') userId: number,
    @Body() user: Pick<User, 'weight' | 'height' | 'email'>,
  ) {
    return await this.userService.updateUser(userId, user);
  }

  @Delete(':id')
  async deleteWorkout(@Param('id') userId: number) {
    return await this.userService.deletedUser(userId);
  }
}
