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
import { BrandsService } from './brands.service';
import { ModelsService } from '../models/models.service';
import { IBrand } from './IBrand';

@Resolver('Brand')
export class BrandsResolvers {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly modelsService: ModelsService,
  ) {}

  @Query()
  async getBrands() {
    return this.brandsService.findAllBrands();
  }

  @Query()
  async getBrand(@Args('name') name: string): Promise<any> {
    return this.brandsService.findOneBrand(name);
  }

  @Mutation()
  async addBrand(@Args('brand') brand: IBrand) {
    return this.brandsService.createBrand(brand);
  }

  @ResolveProperty()
  async models(carModel: IBrand) {
    console.log(carModel);
    return this.modelsService.findBrand(carModel.name);
  }
}
