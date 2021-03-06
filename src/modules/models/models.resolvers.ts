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
import { IModel } from './interfaces/IModel';
import { ModelInput } from './dto/ModelInput';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { Model } from './models.entity';
import { Brand } from '../brands/brands.entity';
import { BrandInput } from '../brands/dto/BrandInput';

@Resolver(of => Model)
export class ModelsResolvers {
  constructor(
    private readonly modelsService: ModelsService,
    private readonly brandsService: BrandsService,
  ) {}

  @Query(() => String)
  async getModelsGreeting() {
    return this.modelsService.getModelsGreeting();
  }

  @Query(() => [Model])
  async getModels(): Promise<Model[]> {
    return this.modelsService.findAllModels();
  }

  @Query(() => Model)
  async getModel(@Args('label') label: string): Promise<Model> {
    return this.modelsService.findOneModel(label);
  }

  @Mutation(() => Model)
  async addModel(@Args('model') model: ModelInput): Promise<Model> {
    return this.modelsService.createModel(model);
  }

  @Mutation(() => Model)
  async updateCarPrice(
    @Args('model') model: ModelPriceInput,
  ): Promise<ModelPriceInput> {
    return this.modelsService.updateModelPrice(model);
  }

  @ResolveProperty('brand', () => Brand)
  async brand(@Parent() model: ModelInput): Promise<Brand> {
    //console.log('Resolvering property for :', model);
    //console.log(model.brandId);

    return this.brandsService.findBrandbyId(model.brandId);
  }
}

/**
 * {
 *   model {
 *      name
 *      brand {
 *        name
 * }
 * }
 * }
 *
 */
