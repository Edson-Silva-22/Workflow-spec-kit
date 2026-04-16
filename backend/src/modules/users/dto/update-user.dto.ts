import { IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role, UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}