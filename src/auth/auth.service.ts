import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async requestOtp(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('email does not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); //otp is valid for 10 minutes only
    user.resetOtp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await this.userService.update(user.user_id, user);

    // send email
    await this.mailerService.sendMail({
      to: email,
      subject: 'password reset otp',
      text: `your otp is : ${otp} and valid for 10 min`,
    });
    return { msg: 'Otp send to email' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user, 'user data');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.resetOtp != otp || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    const salt = await bcrypt.genSalt(10);
    user.resetOtp = null;
    user.otpExpiresAt = null;
    await this.userService.update(user.user_id, {
      password: newPassword,
      resetOtp: null,
      otpExpiresAt: null,
    });
    return { msg: 'password reset successfully', user, newPassword };
  }
  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Email:${email} not found`);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect, 'correct');
    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid Credentials');
    }
    const payload = { email: user.email, role: user.role, sub: user.user_id };
    return {
      msg: 'login successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
