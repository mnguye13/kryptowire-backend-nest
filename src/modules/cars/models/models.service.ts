import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { runInThisContext } from 'vm';
import { IModel } from './IModel';
import { Model } from './models.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  findAllModels() {
    console.log('find all models');
    return this.modelRepository.find();
  }
  async findOneModel(label: string) {
    console.log('find one models');
    const data = await this.modelRepository.findOne({
      where: [{ label: label }],
    });
    return data;
  }

  async findBrand(brandName: string) {
    const data = await this.modelRepository.find({
      where: [{ brandName: brandName }],
    });
    return data;
  }

  async createModel(model: IModel) {
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
  async updateModelPrice(model: IModel) {
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
