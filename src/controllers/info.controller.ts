import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Header,
  Param,
  Put,
  Delete,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from '../app.service';
import { CreateInfoDto } from '../dto/create-info.dto';
import { InfosService } from '../services/infos.service';
import { Info } from '../interfaces/info.interface';

@Controller('infos')
export class InfosController {
  constructor(private readonly infosService: InfosService) {}
  /*
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() CreateInfoDto: CreateInfoDto, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send({
      success: 'success',
    });
  }*/
  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createInfoDto: CreateInfoDto) {
    console.log(createInfoDto);
    /*
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: '',
      },
      403,
    );*/
    await this.infosService.create(createInfoDto);
  }
  /*

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: 'success',
    });
  }*/

  @Get()
  async findAll(): Promise<Info[]> {
    return this.infosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: 'success',
      id: id,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: 'success',
      id: id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      success: 'success',
      id: id,
    });
  }
}
