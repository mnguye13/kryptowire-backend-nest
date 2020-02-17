import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from '../interfaces/info.interface';
import { CreateInfoDto } from '../dto/create-info.dto';

@Injectable()
export class InfosService {
  constructor(
    @InjectModel('InfoData') private readonly infoModel: Model<Info>,
  ) {}

  async create(createInfoDto: CreateInfoDto): Promise<Info> {
    const createdInfo = new this.infoModel(createInfoDto);
    return createdInfo.save();
  }
  async findAll(): Promise<Info[]> {
    return this.infoModel.find().exec();
  }
}
