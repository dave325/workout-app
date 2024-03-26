import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import WorkoutService from './workout.service';
import { Public } from 'src/user/user.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('workout')
@ApiTags('Workout')
@ApiBearerAuth()
export default class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}


  @Get()
  @Public()
  async findAllWorkouts() {
    return await this.workoutService.findWorkouts();
  }

  @Get(':id')
  async findWorkoutByID(@Param('id') id: number) {
    return await this.workoutService.findWorkoutByID(id);
  }
}

