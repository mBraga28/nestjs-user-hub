import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    readonly password?: string;

    @IsNotEmpty()
    @IsString()    
    @ApiProperty()
    readonly roleId: string;
}