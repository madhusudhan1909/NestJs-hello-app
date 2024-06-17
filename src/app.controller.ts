import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World2!'; // Ensure this method returns 'Hello World!'
  }
}
