import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Email:${email} not found`);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect, 'or not');
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: user.user_id, email: user.email };
    return {
      msg: 'login successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
