import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';

export class CarsService {
  private readonly brands = [
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

  private readonly models = [
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

  findAllBrands() {
    return this.brands;
  }
  findAllModels() {
    return this.models;
  }
  findOneBrand(name: string) {
    return this.brands.find(b => b.name === name);
  }
  findOneModel(label: string) {
    return this.models.find(m => m.label === label);
  }

  createBrand(brand: any) {
    this.brands.push(brand);
    return brand;
  }

  createModel(model: any) {
    this.models.push(model);
    return model;
  }

  updateModelPrice(model: any) {
    const car = this.models.find(m => m.label == model.label);
    car.price = model.price;
    return car;
  }
}
