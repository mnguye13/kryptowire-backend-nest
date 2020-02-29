import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, createQueryBuilder } from 'typeorm';
import { runInThisContext } from 'vm';
import { IModel } from './interfaces/IModel';
import { Model } from './models.entity';
import { ModelInput } from './dto/ModelInput';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { Brand } from '../brands/brands.entity';
import { BrandInput } from '../brands/dto/BrandInput';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAllModels(): Promise<Model[]> {
    console.log('find all models');
    return this.modelRepository.find();
  }

  async findOneModel(label: string): Promise<Model> {
    console.log('find one models');
    try {
      const data = await this.modelRepository.findOne({
        label,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async findModelsByBrand(brandName: string): Promise<Model[]> {
    try {
      const model = await this.modelRepository
        .createQueryBuilder('model')
        .innerJoinAndSelect('model.brand', 'brand')
        .where('brand.name=:name', { name: brandName })
        .getMany();
      return model;
    } catch (e) {
      console.log(e);
    }
  }

  async createModel(model: ModelInput): Promise<ModelInput> {
    console.log('create all models');
    try {
      const brand = await this.brandRepository.findOne({
        where: { name: model.brandName },
      });
      const data = await this.modelRepository.insert({
        label: model.label,
        price: model.price,
        year: model.year,
        brandId: brand.id,
      });
      return model;
    } catch (e) {
      console.log(e);
    }
  }

  async updateModelPrice(
    modelPriceInput: ModelPriceInput,
  ): Promise<ModelPriceInput> {
    const data = await this.modelRepository.update(
      { label: modelPriceInput.label },
      {
        price: modelPriceInput.price,
      },
    );
    console.log('Update model price');
    return modelPriceInput;
  }
}
