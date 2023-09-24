import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req, @Body() body) {
    // Reload
    const validateUer = this.authService.validateUser(body.username, body.password)
    if (!validateUer){
      throw new BadRequestException('Username and password could not be found.')
    }
    return this.authService.generateJwtToken(req.user);
  }
}
