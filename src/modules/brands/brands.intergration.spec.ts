import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brands.entity';
import { BrandInput } from './dto/BrandInput';
import { IBrand } from './interfaces/IBrand';
import { DatabaseModule } from '../../database/database.module';
import { BrandsResolvers } from './brands.resolvers';
import { BrandsService } from './brands.service';
import { ModelsService } from '../models/models.service';
import { Model } from '../models/models.entity';
import { getConnection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { doesNotMatch } from 'assert';

describe('Brand Module Integration', () => {
  let brandResolvers: BrandsResolvers;

  beforeAll(async () => {
    const brandModule: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Model, Brand]),
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [BrandsResolvers, ModelsService, BrandsService],
    }).compile();

    brandResolvers = brandModule.get<BrandsResolvers>(BrandsResolvers);
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should be defined', async () => {
    expect(brandResolvers).toBeDefined();
  });

  describe('CRUD Brand', () => {
    const existedBrand: BrandInput = {
      name: 'Tesla',
      origin: 'US',
    };
    const newBrand: BrandInput = {
      name: 'Volvo',
      origin: 'Sweden',
    };

    it('should return all brands', async () => {
      const data = await brandResolvers.getBrands();
      expect(data.length).toBe(15);
    });
    it('should return one brand', async () => {
      const data = await brandResolvers.getBrand('Audi');
      expect(data.origin).toBe('German');
    });
    it('should be error when creating existed brand', async () => {
      const data = await brandResolvers.addBrand(existedBrand);
      expect(data).toBe(undefined);
    });
    /*

    it('should create one brand', async () => {
      const data = await brandResolvers.addBrand(newBrand);
      expect(data).toStrictEqual({ name: 'Volvo', origin: 'Sweden' });
    });*/

    it('should return models by brand', async () => {
      const data = await brandResolvers.models({
        id: 4,
        name: 'BMW',
        origin: 'German',
      });
      expect(data.length).toBe(1);
    });
  });
});
