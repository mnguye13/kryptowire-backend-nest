import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsResolvers } from './models.resolvers';
import { ModelsService } from './models.service';
import { BrandsService } from '../brands/brands.service';
import { Model } from './models.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelsResolvers, ModelsService, BrandsService],
})
export class ModelsModule {}
