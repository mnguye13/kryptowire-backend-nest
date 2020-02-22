import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { runInThisContext } from 'vm';
import { IModel } from './IModel';
import { Model } from './models.entity';

@Injectable()
export class ModelsService {
  /*
  constructor(
    
    @InjectModel(Model)
    private readonly modelModel: typeof Model,
    private readonly sequelize: Sequelize,
  )*/

  private readonly models: IModel[] = [
    {
      label: 'S3',
      brandName: 'Audi',
      year: '2020',
      price: 43000,
    },
    {
      label: 'M3',
      brandName: 'BMW',
      year: '2020',
      price: 70000,
    },
    {
      label: 'RS7',
      brandName: 'Audi',
      year: '2020',
      price: 2020,
    },
    {
      label: 'CLA45',
      brandName: 'Mercedes',
      year: '2020',
      price: 54800,
    },
    {
      label: 'GT63s',
      brandName: 'Mercedes',
      year: '2020',
      price: 136500,
    },
    {
      label: 'C300',
      brandName: 'Mercedes',
      year: '2020',
      price: 41400,
    },
  ];

  findAllModels() {
    return this.models;
  }

  findOneModel(label: string) {
    return this.models.find(m => m.label === label);
  }
  findBrand(brandName: string) {
    console.log(brandName);
    return this.models.filter(m => m.brandName === brandName);
  }

  createModel(model: IModel) {
    this.models.push(model);
    return model;
  }

  updateModelPrice(model: IModel) {
    const car = this.models.find(m => m.label == model.label);
    car.price = model.price;
    return car;
  }
}
