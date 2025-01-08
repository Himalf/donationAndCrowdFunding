import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }
}
