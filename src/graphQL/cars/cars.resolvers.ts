import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';
import { CarsService } from './cars.service';

@Resolver()
export class CarsResolvers {
  constructor(private readonly carsService: CarsService) {}
  @Query()
  info() {
    return 'this is graphQL api for cars';
  }

  @Query()
  async getBrands() {
    return this.carsService.findAllBrands();
  }

  @Query()
  async getModels() {
    return this.carsService.findAllModels();
  }

  @Query()
  async getBrand(@Args('name') name: string): Promise<any> {
    return this.carsService.findOneBrand(name);
  }

  @Query()
  async getModel(@Args('label') label: string): Promise<any> {
    return this.carsService.findOneModel(label);
  }

  @Mutation()
  async addBrand(@Args('brand') brand: any) {
    return this.carsService.createBrand(brand);
  }

  @Mutation()
  async addModel(@Args('model') model: any) {
    return this.carsService.createModel(model);
  }

  @Mutation()
  async updateCarPrice(@Args('model') model: any) {
    return this.carsService.updateModelPrice(model);
  }
}
