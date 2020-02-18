import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /*

  //@UseGuards(AuthGuard('local'))
  @Post('users/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }*/

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
