import { Controller, Get, Body, Put, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticateToken } from 'src/common/decorators/auth-token.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @method Get All User
   */
  @ApiOperation({ summary: 'Get all users' })
  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  /**
   * @method GetUserEntityByEmail
   */
  // @ApiOperation({ summary: 'Create user' })
  // @GET('/:')
  // async create(
  //   @Body() createUserDto: CreateUserDto,
  //   //passportAuthGoogle,
  //   //passportAuthFacebook,
  // ) {
  //   return await this.usersService.getUserEntityByEmail(createUserDto);
  // }

  /**
   * @method Update User
   */
  @ApiOperation({ summary: 'Update user by address' })
  @ApiBearerAuth('JWT-auth')
  @Put('')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @AuthenticateToken() authenticateToken: string,
  ) {
    return await this.usersService.update(updateUserDto, authenticateToken);
  }
}
