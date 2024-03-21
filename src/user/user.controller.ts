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
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import UserService from './user.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Controller('user')
export default class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get(':userId')
    async finduserByID(@Param('userId') userId: number) {
        console.log(userId);
        return await this.userService.findUserByID(userId);
    }

    @Get()
    @ApiBearerAuth()
    async finduserByAuthToken(@Request() req) {
        return req.user
    }

    @Post()
    @Public()
    @ApiBody({type: User})
    async createUser(@Body() user: Omit<User, 'createdAt' | 'updatedAt'>) {
        const createdUserRequest = await this.userService.createUser(user);
        if ('error' in createdUserRequest) {
            throw new BadRequestException(createdUserRequest.error);
        }
        return createdUserRequest;
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: number,
        @Body() user: Pick<User, 'weight' | 'height' | 'email'>,
    ) {
        return await this.userService.updateUser(userId, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: number) {
        return await this.userService.deletedUser(userId);
    }
}
