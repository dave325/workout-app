import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Workout } from 'src/entities/workout.entity';

@Injectable()
export default class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: EntityRepository<Workout>,
    private readonly em: EntityManager,
  ) { }

  findWorkouts(params: {
    limit?: number,
    offset?: number
  } = {}) {
    const { limit = 50, offset = 0 } = params
    return this.workoutRepository.findAndCount({user: null}, { limit, offset });

  }

  findWorkoutByID(id: number) {
    return this.workoutRepository.findOne(id);
  }

  findWorkoutByUserId(userId: number) {
    return this.workoutRepository.find({ user: userId });
  }

  async createWorkout(workout: Omit<Workout, 'createdAt' | 'updatedAt'>) {
    await this.workoutRepository.create(workout);
    return this.em.flush();
  }

  async updateWorkout(
    workoutID: number,
    userId: number,
    workout: Pick<Workout, 'sets' | 'reps' | 'exercise'>,
  ) {
    const workoutExists = await this.workoutRepository.count({id: workoutID, user: userId});
    if(!workoutExists){
      return undefined;
    }

    return this.workoutRepository.nativeUpdate(
      { id: workoutID, deletedOn: null },
      { ...workout, updatedAt: new Date() },
    );
  }

  deletedWorkout(workoutID: number, userID: number) {
    const currentDate = new Date();
    return this.workoutRepository.nativeUpdate(
      {
        id: workoutID,
        user: userID,
        deletedOn: null,
      },
      { deletedOn: currentDate, updatedAt: currentDate },
    );
  }
}
