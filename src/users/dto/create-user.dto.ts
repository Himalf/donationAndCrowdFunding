import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from './userRole.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsString()
  profile_image: string;
}
