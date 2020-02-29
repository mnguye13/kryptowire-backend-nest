import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IBrand } from './interfaces/IBrand';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Brand } from './brands.entity';
import { BrandInput } from './dto/BrandInput';
import { Model } from '../models/models.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async findAllBrands(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOneBrand(name: string): Promise<Brand> {
    try {
      console.log('find one brand');
      //const brand = await this.brandRepository.find({ relations: ['models'] });
      //console.log(name);

      const data = await this.brandRepository.findOne({
        name,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async findBrandbyModels(id: number): Promise<Brand> {
    try {
      const data = await this.brandRepository.findOne({ id });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async createBrand(brand: BrandInput): Promise<BrandInput> {
    try {
      const existedBrand = await this.brandRepository.findOne({
        name: brand.name,
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
