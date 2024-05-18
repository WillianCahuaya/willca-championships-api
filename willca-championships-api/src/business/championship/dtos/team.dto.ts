import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

import { BaseDto } from '@commons/index';

export class TeamDto extends BaseDto {

    @IsString()
    @MaxLength(11)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    description: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    abbreviation: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    nickname: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    fundation: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    stadium: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    league: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    location: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({ type: String })
    country: string;

}