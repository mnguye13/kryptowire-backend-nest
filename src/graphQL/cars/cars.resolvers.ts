import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';

@Resolver('')
export class CarsResolver {
  brands = [
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

  models = [
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

  @Query()
  getBrands() {
    return this.brands;
  }

  @Query()
  getModels() {
    return this.models;
  }

  @Query()
  async getBrand(@Args('name') name: string): Promise<any> {
    return this.brands.find(brand => brand.name === name);
  }

  @Query()
  async getModel(@Args('label') label: string): Promise<any> {
    return this.models.find(model => model.label === label);
  }

  @Mutation()
  addBrand(@Args('brand') brand: any) {
    this.brands.push(brand);
    return brand;
  }

  @Mutation()
  addModel(@Args('model') model: any) {
    this.models.push(model);
    return model;
  }
}
