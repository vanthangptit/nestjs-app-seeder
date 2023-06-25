import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const AuthenticateToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request: any = ctx.switchToHttp().getRequest();
  const token = request?.headers?.authorization;

  if (token == null) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

  return token;
});
