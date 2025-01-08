import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from './userRole.enum';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
  @IsString()
  password;
  @IsEnum(UserRole)
  role: UserRole;
  @IsString()
  profile_image: string;
}
