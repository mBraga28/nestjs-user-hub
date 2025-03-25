import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "user@example.com" })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: "newPassword123" })
  newPassword: string;
}