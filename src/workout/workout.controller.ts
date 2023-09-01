import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import WorkoutService from './workout.service';
import { Workout } from 'src/entities/workout.entity';

@Controller('workout')
export default class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @Get()
  async findWorkoutByUserID(userID = 2) {
    return await this.workoutService.findWorkoutByUserId(userID);
  }

  @Get(':id')
  async findWorkoutByID(@Param('id') id: number) {
    return await this.workoutService.findWorkoutByID(id);
  }

  @Post()
  async createWorkout(
    @Body() workout: Omit<Workout, 'createdAt' | 'updatedAt'>,
  ) {
    return await this.workoutService.createWorkout(workout);
  }

  @Patch(':id')
  async updateWorkout(
    @Param('id') workoutId: number,
    @Body() workout: Pick<Workout, 'sets' | 'reps' | 'exercise'>,
  ) {
    return await this.workoutService.updateWorkout(workoutId, workout);
  }

  @Delete(':id')
  async deleteWorkout(@Param('id') workoutID: number) {
    return await this.workoutService.deletedWorkout(workoutID, 2);
  }
}
