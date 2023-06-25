import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  // IsDate,
  // IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  // IsArray,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;
}

export class UserAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
