import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { BrandsResolvers } from '../brands/brands.resolvers';
import { BrandsService } from '../brands/brands.service';
import { ModelsResolvers } from './models.resolvers';
import { ModelsService } from './models.service';
import { ModelsModule } from './models.modules';
import { Brand } from '../brands/brands.entity';
import { Model } from './models.entity';
import { ModelPriceInput } from './dto/ModelPriceInput';

export const mockModelRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve([
        { id: 1, label: 'S3', price: 30000, year: '2020', brandId: 3 },
        { id: 2, label: 'M3', price: 70000, year: '2020', brandId: 4 },
        { id: 3, label: 'RS7', price: 120000, year: '2020', brandId: 3 },
        { id: 6, label: 'GTS63', price: 1365000, year: '2020', brandId: 3 },
      ]);
    }),
  findOne: () =>
    new Promise((resolve, reject) => {
      resolve({ id: 1, label: 'S3', price: 30000, year: '2020', brandId: 3 });
    }),
  update: () =>
    new Promise((resolve, reject) => {
      resolve({ id: 1, label: 'S3', price: 32000, year: '2020', brandId: 3 });
    }),
}));

export const mockBrandRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve({ id: 3, name: 'Audi', origin: 'German' });
    }),
  findOne: () =>
    new Promise((resolve, reject) => {
      resolve({ id: 3, name: 'Audi', origin: 'German' });
    }),
}));

describe('ModelsResolvers', () => {
  let modelsResolvers: ModelsResolvers;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsResolvers,
        ModelsService,
        BrandsService,
        {
          provide: getRepositoryToken(Model),
          useClass: mockModelRepository,
        },

        {
          provide: getRepositoryToken(Brand),
          useClass: mockBrandRepository,
        },
      ],
    }).compile();
    modelsResolvers = module.get<ModelsResolvers>(ModelsResolvers);

    //modelsService = await module.resolve(ModelsService);
    //brandsService = await module.resolve(BrandsService);
  });
  it('should be defined', () => {
    expect(modelsResolvers).toBeDefined();
  });

  describe('Greetings for models', () => {
    it('return "API for models"', async () => {
      const result = 'API for models';
      /*
      jest
        .spyOn(modelsResolvers, 'getModelsGreeting')
        .mockImplementation(() => result);*/
      expect(await modelsResolvers.getModelsGreeting()).toBe(result);
    });
  });

  describe('Find all models', () => {
    it('Can find all model', async () => {
      const result: Model[] = [
        { id: 1, label: 'S3', price: 30000, year: '2020', brandId: 3 },
        { id: 2, label: 'M3', price: 70000, year: '2020', brandId: 4 },
        { id: 3, label: 'RS7', price: 120000, year: '2020', brandId: 3 },
        { id: 6, label: 'GTS63', price: 1365000, year: '2020', brandId: 3 },
      ];
      //jest.spyOn(modelsResolvers, 'getModels').mockImplementation(() => result);
      expect(await modelsResolvers.getModels()).toStrictEqual(result);
    });
  });

  describe('Find one model', () => {
    it('Can find one model', async () => {
      const result: Model = {
        id: 1,
        label: 'S3',
        price: 30000,
        year: '2020',
        brandId: 3,
      };
      expect(await modelsResolvers.getModel('S3')).toStrictEqual(result);
    });
  });

  describe('Update Model Price', () => {
    it('Can update model price', async () => {
      const result: ModelPriceInput = {
        label: 'S3',
        price: 32000,
      };
      expect(
        await modelsResolvers.updateCarPrice({ label: 'S3', price: 32000 }),
      ).toStrictEqual(result);
    });
  });
});
