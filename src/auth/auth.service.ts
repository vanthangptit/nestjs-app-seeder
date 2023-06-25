import { InternalServerErrorException , ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { hashPassword } from '../utils';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private userService: UsersService,
    private mailSenderService: MailSenderService,
  ) {}

  async signUp(sigUpRequest: CreateUserDto): Promise<void> {
    const emailVerificationToken = nanoid();
    const email = sigUpRequest.email.toLowerCase();
    const name = email.split('@')[0];

    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (user) {
        throw new HttpException('Email already is exists, please try again with email another', HttpStatus.FORBIDDEN);
      }

      await this.userModel.collection.dropIndexes();
      await this.userModel.create({
        email,
        name,
        passwordHash: await hashPassword(sigUpRequest.password),
        emailVerified: false,
      });

      // await this.mailSenderService.sendVerifyEmailMail(name, email, emailVerificationToken);
      await this.mailSenderService.sendVerifyEmail(email);
    } catch (error) {
      throw new  InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error. ' + error,
      })
    }
  }

  async getChallenge(email: string, web3Auth: any) {
    const challenge = JSON.parse(web3Auth.challenge);

    if (!challenge) throw new HttpException('Email not found', HttpStatus.FORBIDDEN);
    return { email, ...challenge };
  }

  async authenticate(authDecorator) {
    if (authDecorator.recovered) {
      const user: UserDocument = await this.userModel.findOne({
        address: authDecorator.recovered,
      });

      if (user) {
        const token = await this.generateAccessToken(user.email);

        return {
          user,
          token,
        };
      } else {
        const defaultUserInfo: CreateUserDto = {
          email: authDecorator.recovered,
          emailVerified: false,
        };

        const createdUser = await this.userModel.create(defaultUserInfo);

        const token = await this.generateAccessToken(createdUser.email);

        return {
          user: createdUser,
          token,
        };
      }
    }

    throw new UnauthorizedException();
  }

  async generateAccessToken(email) {
    return this.jwtService.sign({ email });
  }

  async verifyAccessToken(token: string) {
    try {
      const recoveredUser = await this.jwtService.verify(token);

      const user = await this.userModel.findOne({
        email: recoveredUser.email,
      });

      if (user) return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }

  async getMe(token: string) {
    const data = await this.verifyAccessToken(token);

    const user = await this.userModel.findOne({ email: data.email });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
