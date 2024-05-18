import { BaseSchema } from "@app/commons";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team extends BaseSchema {

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    description: string;

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    abbreviation: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    nickname: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    fundation: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    stadium: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    league: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    location: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    country: string;

    @Prop({ default: 'ACTIVO' })
    @ApiProperty({ type: String })
    status: string;

}
export const TeamSchema = SchemaFactory.createForClass(Team);