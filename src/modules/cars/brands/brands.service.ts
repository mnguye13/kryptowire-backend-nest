import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IBrand } from './interfaces/IBrand';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Brand } from './brands.entity';
import { BrandInput } from './dto/BrandInput';
import { BrandType } from './dto/BrandType';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAllBrands(): Promise<BrandInput[]> {
    return await this.brandRepository.find();
  }

  async findOneBrand(name: string): Promise<BrandInput> {
    console.log('find one brand');
    const data = await this.brandRepository.findOne({
      where: [{ name: name }],
    });
    return data;
  }

  async createBrand(brand: BrandInput): Promise<BrandInput> {
    try {
      const existedBrand = await this.brandRepository.findOne({
        where: [{ name: brand.name }],
      });
      if (!existedBrand) {
        const data = await this.brandRepository.insert({
          name: brand.name,
          origin: brand.origin,
        });
        return brand;
      } else {
        console.log('Brand existed!');
      }
    } catch (e) {
      console.log(e);
    }
  }
}
