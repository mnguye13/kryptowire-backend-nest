import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsResolvers } from './brands.resolvers';
import { BrandsService } from './brands.service';
import { BrandsModule } from './brands.modules';
import { ModelsService } from '../models/models.service';
import { IBrand } from './interfaces/IBrand';
import { Brand } from './brands.entity';
import { Model } from '../models/models.entity';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';

describe('BrandsSarvice', () => {
  let brandsService: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Brand, Model]),
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [BrandsService],
    }).compile();

    brandsService = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(brandsService).toBeDefined();
  });

  describe('Greetings for brands', () => {
    it('return "API for brands"', async () => {
      expect(await brandsService.getBrandsGreeting()).toBe('API for brands');
    });
  });

  describe('Find one brand', () => {
    it('Can find one brand', async () => {
      const result: Brand = { id: 3, name: 'Audi', origin: 'German' };
      expect(await brandsService.findOneBrand('Audi')).toEqual(result);
    });
  });

  describe('Find brand by id', () => {
    it('Can find brand by id', async () => {
      const result: Brand = {
        id: 3,
        name: 'Audi',
        origin: 'German',
      };
      expect(await brandsService.findBrandbyId(3)).toEqual(result);
    });
  });
});
