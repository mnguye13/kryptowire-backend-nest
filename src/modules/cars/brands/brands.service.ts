import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IBrand } from './IBrand';
import { Brand } from './brands.entity';

@Injectable()
export class BrandsService {
  private readonly brands: IBrand[] = [
    {
      name: 'Audi',
      origin: ' German',
    },
    {
      name: 'BMW',
      origin: ' German',
    },
    {
      name: 'Mercedes',
      origin: ' German',
    },
  ];

  findAllBrands() {
    return this.brands;
  }

  findOneBrand(name: string) {
    return this.brands.find(b => b.name === name);
  }

  createBrand(brand: IBrand) {
    this.brands.push(brand);
    return brand;
  }
}
