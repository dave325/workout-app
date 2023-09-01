import { Module } from '@nestjs/common';
import WorkoutController from './workout.controller';
import WorkoutService from './workout.service';
import { Workout } from 'src/entities/workout.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Workout])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export default class WorkoutModule {}
