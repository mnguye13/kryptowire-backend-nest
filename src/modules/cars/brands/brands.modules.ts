import { Module } from '@nestjs/common';
import { BrandsResolvers } from './brands.resolvers';
import { BrandsService } from './brands.service';
import { ModelsService } from '../models/models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brands.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsResolvers, BrandsService, ModelsService],
})
export class BrandsModule {}
