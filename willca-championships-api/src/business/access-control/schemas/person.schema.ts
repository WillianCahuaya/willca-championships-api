import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person {

    @Transform(({ value }) => value.toString())
    _id: string;

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
    creationUser: string;

    @Prop({ required: false })
    editionUser: string;

}
export const PersonSchema = SchemaFactory.createForClass(Person);