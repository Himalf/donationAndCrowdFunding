import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    description: 'Login details',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: 'hari@mail.com' },
        password: { type: 'string', example: 'hari123' },
      },
      required: ['email', 'password'],
    },
  })
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }
  @Public()
  @Post('forget-password')
  async requestOtp(@Body('email') email: string) {
    return this.authService.requestOtp(email);
  }
  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, otp, newPassword);
  }
}
