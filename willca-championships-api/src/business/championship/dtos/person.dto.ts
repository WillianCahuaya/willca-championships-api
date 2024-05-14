import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PersonDto {

    _id: string;

    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    dni: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    firstName: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    lastName: string;

}