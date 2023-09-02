import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    // Reload
    return this.authService.generateJwtToken(req.user);
  }
}
