import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    SetMetadata,
    Request,
    Get,
    NotFoundException,
    UnprocessableEntityException,
    Res,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import UserService from './user.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import WorkoutService from 'src/workout/workout.service';
import { Workout } from 'src/entities/workout.entity';
import { Response } from 'express';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export default class UserController {
    constructor(private readonly userService: UserService, private readonly workoutService: WorkoutService) { }


    @Get(':userId')
    async finduserByID(@Param('userId') userId: number) {
        console.log(userId);
        return await this.userService.findUserByID(userId);
    }

    @Get()
    async finduserByAuthToken(@Request() req) {
        return req.user
    }

    @Post()
    @Public()
    @ApiBody({ type: User })
    async createUser(@Body() user: Omit<User, 'createdAt' | 'updatedAt'>) {
        const createdUserRequest = await this.userService.createUser(user);
        if ('error' in createdUserRequest) {
            throw new BadRequestException(createdUserRequest.error);
        }
        return createdUserRequest;
    }

    @Patch(':userId')
    async updateUser(
        @Param('userId') userId: number,
        @Body() user: Pick<User, 'weight' | 'height' | 'email'>,
    ) {
        return await this.userService.updateUser(userId, user);
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: number) {
        return await this.userService.deletedUser(userId);
    }


    @Get(':userId/workout')
    async findWorkoutByUserID(@Param('userId') userId: number) {
        return await this.workoutService.findWorkoutByUserId(userId);
    }

    @Post(':userId/workout')
    @ApiBody({ type: Workout })
    @ApiParam({ 'name': 'userId' })
    async createWorkout(
        @Request() request,
        @Body() workout: Omit<Workout, 'createdAt' | 'updatedAt'>,
    ) {
        return await this.workoutService.createWorkout({ ...workout, user: request.user });
    }

    @Patch(':userId/workout/:workoutId')
    @ApiBody({ type: Workout })
    @ApiParam({ 'name': 'userId' })
    @ApiParam({ 'name': 'workoutId' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateWorkout(
        @Res() res: Response,
        @Body() workout: Pick<Workout, 'sets' | 'reps' | 'exercise'>,
    ) {
        const { userId, workoutId } = res.locals;

        const existingWorkout = await this.workoutService.findWorkoutByID(workoutId);

        if (!existingWorkout || existingWorkout.user.id !== userId) {
            throw new NotFoundException();
        }

        return await this.workoutService.updateWorkout(workoutId, userId, workout);

    }

    @Delete(':userId/workout/:workoutId')
    @ApiParam({ 'name': 'userId' })
    @ApiParam({ 'name': 'workoutId' })
    async deleteWorkout(@Res() res: Response,
    ) {
        const { userId, workoutId } = res.locals;
        return await this.workoutService.deletedWorkout(workoutId, userId);
    }
}
