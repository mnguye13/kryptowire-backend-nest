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
import { BrandType } from './dto/BrandType';
import { BrandInput } from './dto/BrandInput';
import { Brand } from './brands.entity';
import { Model } from '../models/models.entity';
import { ModelType } from '../models/dto/ModelType';
import { ModelInput } from '../models/dto/ModelInput';
@Resolver(of => BrandType)
export class BrandsResolvers {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly modelsService: ModelsService,
  ) {}

  @Query(() => [BrandType])
  async getBrands(): Promise<BrandInput[]> {
    return this.brandsService.findAllBrands();
  }

  @Query(() => BrandType)
  async getBrand(@Args('name') name: string): Promise<BrandInput> {
    return this.brandsService.findOneBrand(name);
  }

  @Mutation(() => BrandType)
  async addBrand(@Args('brand') brand: BrandInput): Promise<BrandInput> {
    return this.brandsService.createBrand(brand);
  }

  @ResolveProperty('models', returns => [ModelInput])
  async models(carModel: BrandType): Promise<ModelInput[]> {
    return this.modelsService.findBrand(carModel);
  }
}
