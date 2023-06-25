import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @IsEmail()
  @Prop({
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({ required: false, nullable: true, minLength: 5, maxlength: 100 })
  password: string;

  @Prop({ required: false, nullable: true, minLength: 5, maxlength: 100 })
  name: string;

  @Prop({ required: false, nullable: true })
  imageUrl?: string;

  @Prop({ required: true, default: false })
  emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
