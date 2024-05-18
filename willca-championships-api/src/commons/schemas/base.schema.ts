import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BaseSchema {

    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ default: true })
    @ApiProperty({ type: Boolean })
    available: boolean;

    @Prop({ required: true })
    creationUser: string;

    @Prop({ required: false })
    editionUser: string;

}