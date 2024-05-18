import { BaseSchema, TablesEnum } from "@app/commons";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

import { Team } from "@championship/schemas/index";

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person extends BaseSchema {

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    dni: string;

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    firstName: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    lastName: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    shirtName: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    position: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    birthday: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    location: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    nationality: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    favoriteFoot: string;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    height: number;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    weight: number;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    squadNumber: number;

    @Prop({ default: 'ACTIVO' })
    @ApiProperty({ type: String })
    status: string;

    @Prop({ type: Types.ObjectId, ref: TablesEnum.TEAM })
    @ApiProperty({ type: Team })
    team: Team;

}
export const PersonSchema = SchemaFactory.createForClass(Person);