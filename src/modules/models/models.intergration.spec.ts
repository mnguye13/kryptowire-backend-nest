import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/brands.entity';
import { ModelInput } from './dto/ModelInput';
import { ModelPriceInput } from './dto/ModelPriceInput';
import { DatabaseModule } from '../../database/database.module';
import { BrandsResolvers } from '../brands/brands.resolvers';
import { BrandsService } from '../brands/brands.service';
import { ModelsService } from './models.service';
import { Model } from './models.entity';
import { getConnection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ModelsResolvers } from './models.resolvers';

describe('Model Module Integration', () => {
  let modelResolvers: ModelsResolvers;

  beforeAll(async () => {
    const modelModule: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Model, Brand]),
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [ModelsResolvers, ModelsService, BrandsService],
    }).compile();

    modelResolvers = modelModule.get<ModelsResolvers>(ModelsResolvers);
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should be defined', async () => {
    expect(modelResolvers).toBeDefined();
  });

  describe('CRUD Models', () => {
    const testModel: ModelInput = {
      label: 'GTS63',
      year: '2020',
      price: 136500,
      brandName: 'Mercedes',
      brandId: 5,
    };
    it('should return all models', async () => {
      const data = await modelResolvers.getModels();
      expect(data.length).toBe(4);
    });

    it('should return one model', async () => {
      const data = await modelResolvers.getModel('RS7');
      expect(data.price).toBe(120000);
    });

    it('should return brand by model', async () => {
      const data = await modelResolvers.brand(testModel);
      console.log(data);
      expect(data.name).toBe('Mercedes');
    });
  });
});
