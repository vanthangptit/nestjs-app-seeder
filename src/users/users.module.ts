import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
