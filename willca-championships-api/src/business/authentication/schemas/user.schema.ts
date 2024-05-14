import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    username: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    password: string;

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    fullname: string;

    @Prop({ unique: true, required: true })
    @ApiProperty({ type: String })
    email: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    role: string;

    @Prop({ required: false })
    accessToken: string;
    
    @Prop({ required: false })
    refreshToken: string;

    @Prop({ required: true })
    creationUser: string;

    @Prop({ required: false })
    editionUser: string;

}
export const UserSchema = SchemaFactory.createForClass(User);