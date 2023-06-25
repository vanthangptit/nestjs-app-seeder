import oauth from 'oauth';
import { nanoid } from 'nanoid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { User, UserDocument } from 'src/models';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { cache } from '../auth/auth.decorator';

@Injectable()
export class UsersService {
  private readonly _twitterConsumerKey: string;
  private readonly _twitterConsumerSecret: string;
  private readonly twitterCallbackUrl: string;
  private consumer;

  constructor(
    @InjectModel('Users') public userModel: Model<User>,
  ) {}

  async getUserEntityByEmail(createUserDto: CreateUserDto) {
    // return { message: 'Create success', data: createUserDto };
    return { message: 'Create success' };
  }

  async update(updateUserDto: UpdateUserDto, authenticateToken: string) {
    // const userInfo: UserDocument = await this.authService.verifyAccessToken(authenticateToken);
    //
    // const user = await this.userModel.findOne({ address: userInfo.address });
    //
    // if (updateUserDto.alias) {
    //   const aliasExists = await this.userModel.findOne({
    //     alias: updateUserDto.alias,
    //     address: {
    //       $ne: userInfo.address,
    //     },
    //   });
    //
    //   if (aliasExists) {
    //     throw new HttpException(
    //       'Username already in use, please use another username',
    //       HttpStatus.FORBIDDEN,
    //     );
    //   }
    // }
    //
    // await user.updateOne({ ...updateUserDto });
    //
    // const userAfterChange = await this.userModel.findOne({
    //   address: userInfo.address,
    // });
    //
    // const accessToken = this.authService.generateAccessToken(userAfterChange);

    return {
      message: 'Update success',
      data: updateUserDto ?? 'No Data',
      // accessToken: accessToken,
    };
  }

  async getAllUsers() {
    const users = await this.userModel.find();

    return users;
  }
}
