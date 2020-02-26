import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { runInThisContext } from 'vm';
import { IModel } from './dto/IModel';
import { Model } from './models.entity';
import { ModelInput } from './dto/ModelInput';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { ModelType } from './dto/ModelType';
import { Brand } from '../brands/brands.entity';
import { BrandInput } from '../brands/dto/BrandInput';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async findAllModels(): Promise<ModelInput[]> {
    console.log('find all models');
    return this.modelRepository.find();
  }
  async findOneModel(label: string): Promise<ModelInput> {
    console.log('find one models');
    const data = await this.modelRepository.findOne({
      where: [{ label: label }],
    });
    return data;
  }

  async findBrand(model: BrandInput): Promise<ModelInput[]> {
    const data = await this.modelRepository.find({
      where: [{ brandName: model.name }],
    });
    return data;
  }

  async createModel(model: ModelInput): Promise<ModelInput> {
    console.log('create all models');
    try {
      const data = await this.modelRepository.insert({
        label: model.label,
        price: model.price,
        year: model.year,
        brandName: model.brandName,
      });
      console.log(data);
      return model;
    } catch (e) {
      console.log(e);
    }
  }

  async updateModelPrice(model: ModelPriceInput): Promise<ModelPriceInput> {
    const data = await this.modelRepository.update(
      { label: model.label },
      {
        price: model.price,
      },
    );
    console.log('Update model price');
    return model;
  }
}
