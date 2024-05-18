import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class BaseDto {

    _id: string;

    @IsString()
    @MaxLength(50)
    @ApiProperty({ type: String })
    status: string;

}