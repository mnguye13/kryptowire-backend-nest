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
import { IModel } from './IModel';

@Resolver('Model')
export class ModelsResolvers {
  constructor(
    private readonly modelsService: ModelsService,
    private readonly brandsService: BrandsService,
  ) {}

  @Query()
  async getModels() {
    return this.modelsService.findAllModels();
  }

  @Query()
  async getModel(@Args('label') label: string): Promise<any> {
    return this.modelsService.findOneModel(label);
  }

  @Mutation()
  async addModel(@Args('model') model: IModel) {
    return this.modelsService.createModel(model);
  }

  @Mutation()
  async updateCarPrice(@Args('model') model: IModel) {
    return this.modelsService.updateModelPrice(model);
  }

  @ResolveProperty()
  async brand(@Parent() carModel: IModel) {
    console.log('Resolvering property for :', carModel);
    return this.brandsService.findOneBrand(carModel.brandName);
  }
}
