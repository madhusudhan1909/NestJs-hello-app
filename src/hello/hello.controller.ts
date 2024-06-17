import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    constructor() {}

    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
