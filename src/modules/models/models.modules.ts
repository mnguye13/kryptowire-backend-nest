import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsResolvers } from './models.resolvers';
import { ModelsService } from './models.service';
import { BrandsService } from '../brands/brands.service';
import { Model } from './models.entity';
import { Brand } from '../brands/brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand])],
  providers: [ModelsResolvers, ModelsService, BrandsService],
})
export class ModelsModule {}
