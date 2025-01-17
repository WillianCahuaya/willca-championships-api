import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

import { BaseDto } from '@commons/index';
import { TeamDto } from '@championship/dtos/index';

export class PersonDto extends BaseDto {

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

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    shirtName: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    position: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    birthday: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    location: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    nationality: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    favoriteFoot: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number })
    squadNumber: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number })
    height: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number })
    weight: number;

    @IsNotEmpty()
    @ApiProperty({ type: TeamDto })
    team: TeamDto;

}