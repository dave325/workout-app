import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Public } from './user/user.controller';

class AuthDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Post('auth/login')
  @Public()
  @ApiBody({type: AuthDto})
  async login(@Req() req, @Body() body: AuthDto) {
    // Reload
    const validateUer = await this.authService.validateUser(body.username, body.password)
    if (!validateUer){
      throw new BadRequestException('Username and password could not be found.')
    }
    return this.authService.generateJwtToken(validateUer);
  }
}