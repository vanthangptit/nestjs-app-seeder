import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/models';
import { JwtModule } from '@nestjs/jwt';
import { MailSenderModule } from '../mail-sender/mail-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
        };
      },
    }),
    MailSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
