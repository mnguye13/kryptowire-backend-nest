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
import { IBrand } from './interfaces/IBrand';
import { BrandInput } from './dto/BrandInput';
import { Brand } from './brands.entity';
import { Model } from '../models/models.entity';
import { ModelInput } from '../models/dto/ModelInput';
@Resolver(of => Brand)
export class BrandsResolvers {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly modelsService: ModelsService,
  ) {}

  @Query(() => String)
  async getBrandsGreeting() {
    return this.brandsService.getBrandsGreeting();
  }

  @Query(() => [Brand])
  async getBrands(): Promise<Brand[]> {
    return this.brandsService.findAllBrands();
  }

  @Query(() => Brand)
  async getBrand(@Args('name') name: string): Promise<Brand> {
    return this.brandsService.findOneBrand(name);
  }

  @Mutation(() => Brand)
  async addBrand(@Args('brand') brand: BrandInput): Promise<BrandInput> {
    return this.brandsService.createBrand(brand);
  }

  @ResolveProperty('models', returns => [Model])
  async models(brand: Brand): Promise<Model[]> {
    return this.modelsService.findModelsByBrand(brand.name);
  }
}
