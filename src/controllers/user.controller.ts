import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Patch,
  Header,
  Param,
  Put,
  Delete,
  Body,
  HttpStatus,
  HttpException,
  Request,
  UseGuards,
} from '@nestjs/common';
//import { Request, Response } from 'express';
import { AppService } from '../app.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';
import { ValidateUserDto } from '../dto/validate-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return res;
  }
  /*

  @Post('/login')
  async find(@Body() vaildateUserDto: ValidateUserDto) {
    const res = await this.usersService.find(vaildateUserDto);
    return res;
  }*/

  /*
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    //console.log(req.body);
    //return req.body;
  }*/

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
