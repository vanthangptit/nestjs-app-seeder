import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.MONGO_USERNAME_DB}:${process.env.MONGO_PASSWORD_DB}@cluster0.ulyjeiy.mongodb.net/${process.env.MONGO_NAME_DB}?retryWrites=true&w=majority`,
      }),
    }),
    AuthModule,
    UsersModule,
    UploadModule,
    MailSenderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
