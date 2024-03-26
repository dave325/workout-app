import { MiddlewareConsumer, Module } from '@nestjs/common';
import UserController from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';
import UserService from './user.service';
import WorkoutModule from 'src/workout/workout.module';
import WorkoutService from 'src/workout/workout.service';
import { Workout } from 'src/entities/workout.entity';
import { IsValidUser } from 'src/middleware/userValidation.middleware';

@Module({
  imports: [MikroOrmModule.forFeature([User, Workout]), WorkoutModule],
  controllers: [UserController],
  providers: [UserService, WorkoutService],
  exports: [UserService],
})
export default class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidUser)
      .forRoutes(UserController);
  }
}
