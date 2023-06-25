import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  run() {
    return 'Oxy APIs are running!';
  }
}
