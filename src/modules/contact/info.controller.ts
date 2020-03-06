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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InfosService } from './infos.service';
import { Info } from './interface/info.interface';
import { IInfo } from './interface/IInfo';

@Controller('infos')
export class InfosController {
  constructor(private readonly infosService: InfosService) {}

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createInfoDto: CreateInfoDto) {
    console.log(createInfoDto);
    await this.infosService.create(createInfoDto);
  }

  @Get()
  async findAll(): Promise<Info[]> {
    return this.infosService.findAll();
  }

  @Get('hello')
  getHello(): string {
    return this.infosService.getHello();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.infosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    await this.infosService.update(id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infosService.delete(id);
  }
}
