import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserDto {

    _id: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    password: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    fullname: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    role: string;

    @ApiProperty({ type: String })
    accessToken: string;
    
    @ApiProperty({ type: String })
    refreshToken: string;
}