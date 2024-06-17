import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World32!'; // Ensure this method returns 'Hello World!'
  }
}
