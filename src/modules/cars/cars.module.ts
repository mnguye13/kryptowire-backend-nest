import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.modules';
import { ModelsModule } from './models/models.modules';

@Module({
  imports: [BrandsModule, ModelsModule],
})
export class CarsModule {}
