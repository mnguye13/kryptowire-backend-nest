import { Test, TestingModule } from '@nestjs/testing';

import { BrandsResolvers } from './brands.resolvers';
import { BrandsService } from './brands.service';
import { BrandsModule } from './brands.modules';
import { ModelsService } from '../models/models.service';
import { IBrand } from './interfaces/IBrand';
import { Brand } from './brands.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Model } from '../models/models.entity';

export const mockModelRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve([
        { id: 1, label: 'S3', price: 30000, year: '2020', brandId: 3 },
        { id: 2, label: 'M3', price: 70000, year: '2020', brandId: 4 },
        { id: 3, label: 'RS7', price: 120000, year: '2020', brandId: 3 },
        { id: 6, label: 'GTS63', price: 1365000, year: '2020', brandId: 5 },
      ]);
    }),
}));

export const mockBrandRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve([
        { id: 3, name: 'Audi', origin: 'German' },
        { id: 4, name: 'BMW', origin: 'German' },
        { id: 5, name: 'Mercedes', origin: 'German' },
      ]);
    }),
  findOne: () =>
    new Promise((resolve, reject) => {
      resolve({ id: 3, name: 'Audi', origin: 'German' });
    }),
}));

describe('BrandsResolvers', () => {
  let brandsResolvers: BrandsResolvers;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsService,
        BrandsService,
        BrandsResolvers,
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

    brandsResolvers = module.get<BrandsResolvers>(BrandsResolvers);
  });

  it('should be defined', () => {
    expect(brandsResolvers).toBeDefined();
  });

  describe('Greetings for brands', () => {
    it('return "API for brands"', async () => {
      expect(await brandsResolvers.getBrandsGreeting()).toBe('API for brands');
    });
  });

  describe('Find all brands', () => {
    it('Can find all brands', async () => {
      const result: Brand[] = [
        { id: 3, name: 'Audi', origin: 'German' },
        { id: 4, name: 'BMW', origin: 'German' },
        { id: 5, name: 'Mercedes', origin: 'German' },
      ];
      expect(await brandsResolvers.getBrands()).toStrictEqual(result);
    });
  });

  describe('Find one brand', () => {
    it('Can find one brand', async () => {
      const result: Brand = { id: 3, name: 'Audi', origin: 'German' };
      expect(await brandsResolvers.getBrand('Audi')).toStrictEqual(result);
    });
  });
});
