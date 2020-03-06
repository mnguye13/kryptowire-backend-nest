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
  Inject,
  forwardRef,
} from '@nestjs/common';
//import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interface/user.interface';
import { ValidateUserDto } from './dto/validate-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @Post('/register')
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return res;
  }

  //@UseGuards(AuthGuard('local'))
  @Post('/login')
  async find(@Body() vaildateUserDto: ValidateUserDto) {
    if (!vaildateUserDto.email || !vaildateUserDto.password) {
      return { error: 'Invalid Input' };
    } else {
      const res = await this.usersService.find(vaildateUserDto);
      return res;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /*
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
 

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }*/
}
