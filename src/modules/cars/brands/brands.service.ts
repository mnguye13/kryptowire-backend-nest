import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IBrand } from './IBrand';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Brand } from './brands.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAllBrands() {
    console.log('find all brands');
    return await this.brandRepository.find();
  }

  async findOneBrand(name: string) {
    console.log('find one brand');
    const data = await this.brandRepository.findOne({
      where: [{ name: name }],
    });
    return data;
  }

  async createBrand(brand: IBrand) {
    try {
      const data = await this.brandRepository.insert({
        name: brand.name,
        origin: brand.origin,
      });
    } catch (e) {
      console.log(e);
    }

    return brand;
  }
}
