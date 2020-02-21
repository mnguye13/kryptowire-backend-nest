import { Module } from '@nestjs/common';
import { CarsResolvers } from './cars.resolvers';
import { CarsService } from './cars.service';

@Module({
  providers: [CarsResolvers, CarsService],
})
export class CarsModule {}
