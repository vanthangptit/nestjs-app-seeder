import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import NodeCache from 'node-cache';
import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';

const secret = uuidv4();

export const cache = new NodeCache({
  stdTTL: 600,
});

const purpose = `Welcome to Arttaca! Click to sign in and accept our Terms of Service: https://arttaca.com/terms-of-service This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 60 minutes. Challenge:`;

export const AuthDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { authAddress, authSignature, authMessage } = request.params;

  if (authAddress) {
    if (isAddress(authAddress)) {
      const challenge = createChallenge(authAddress);
      request.authDecorator = { challenge };
    } else {
      throw new HttpException('Invalid address', HttpStatus.FORBIDDEN);
    }
  }

  if (authMessage && authSignature) {
    const recovered = checkChallenge(authMessage, authSignature);

    request.authDecorator = { recovered };
  }

  return request.authDecorator;
});

const createChallenge = (address: string) => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(address + uuidv4())
    .digest('hex');

  cache.set(address, hash);

  const data = { purpose, challenge: hash };

  return JSON.stringify(data);
};

const checkChallenge = (challenge: string, sig: string) => {
  const data = { purpose, challenge };

  const recovered = verifyMessage(data.purpose + data.challenge, sig);

  const storedChallenge = cache.get(recovered);

  if (storedChallenge === challenge) {
    cache.del(recovered);
    return recovered;
  }

  return false;
};
