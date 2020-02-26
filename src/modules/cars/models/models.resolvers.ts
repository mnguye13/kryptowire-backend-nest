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
import { ModelsService } from './models.service';
import { BrandsService } from '../brands/brands.service';
import { IModel } from './dto/IModel';
import { ModelInput } from './dto/ModelInput';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { ModelType } from './dto/ModelType';
import { Model } from './models.entity';
import { Brand } from '../brands/brands.entity';
import { BrandInput } from '../brands/dto/BrandInput';
import { BrandType } from '../brands/dto/BrandType';

@Resolver(of => ModelType)
export class ModelsResolvers {
  constructor(
    private readonly modelsService: ModelsService,
    private readonly brandsService: BrandsService,
  ) {}

  @Query(() => [ModelType])
  async getModels(): Promise<ModelInput[]> {
    return this.modelsService.findAllModels();
  }

  @Query(() => ModelType)
  async getModel(@Args('label') label: string): Promise<ModelInput> {
    return this.modelsService.findOneModel(label);
  }

  @Mutation(() => ModelType)
  async addModel(@Args('model') model: ModelInput): Promise<ModelInput> {
    return this.modelsService.createModel(model);
  }

  @Mutation(() => ModelType)
  async updateCarPrice(
    @Args('model') model: ModelPriceInput,
  ): Promise<ModelPriceInput> {
    return this.modelsService.updateModelPrice(model);
  }

  @ResolveProperty('brand', () => BrandType)
  async brand(@Parent() carModel: ModelInput): Promise<BrandInput> {
    console.log('Resolvering property for :', carModel);
    return this.brandsService.findOneBrand(carModel.brandName);
  }
}
