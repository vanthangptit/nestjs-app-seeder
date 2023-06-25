import { Body, Controller, Get, Post, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticateToken } from '../common/decorators/auth-token.decorator';
import { AuthService } from './auth.service';
import { AuthDecorator } from './auth.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() sigUpRequest: CreateUserDto): Promise<void> {
    await this.authService.signUp(sigUpRequest);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Query('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @Get('getme')
  @ApiBearerAuth('JWT-auth')
  async getMe(@AuthenticateToken() token: string) {
    return await this.authService.getMe(token);
  }

  @ApiOperation({ summary: 'Get challenge' })
  @Get(':authAddress')
  getChallenge(@Param('authAddress') address: string, @AuthDecorator() authDecorator: any) {
    return this.authService.getChallenge(address, authDecorator);
  }

  @ApiOperation({ summary: 'Get token' })
  @Get(':authMessage/:authSignature')
  getToken(
    @Param('authMessage') authMessage: string,
    @Param('authSignature') authSignature: string,
    @AuthDecorator() authDecorator: any,
  ) {
    return this.authService.authenticate(authDecorator);
  }
}
