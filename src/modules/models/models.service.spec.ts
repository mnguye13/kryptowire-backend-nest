import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsResolvers } from '../brands/brands.resolvers';
import { BrandsService } from '../brands/brands.service';
import { ModelsResolvers } from './models.resolvers';
import { ModelsService } from './models.service';
import { ModelsModule } from './models.modules';
import { Brand } from '../brands/brands.entity';
import { Model } from './models.entity';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';

describe('BrandsSarvice', () => {
  let modelsService: ModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Brand, Model]),
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [ModelsService],
    }).compile();

    modelsService = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(modelsService).toBeDefined();
  });

  describe('Greetings for models', () => {
    it('return "API for models"', async () => {
      expect(await modelsService.getModelsGreeting()).toBe('API for models');
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
      expect(await modelsService.findOneModel('S3')).toEqual(result);
    });
  });
});
