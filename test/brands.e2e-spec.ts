import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Brand } from '../src/modules/brands/brands.entity';
import { BrandsModule } from '../src/modules/brands/brands.modules';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Model } from '../src/modules/models/models.entity';
import { DatabaseModule } from '../src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

describe('Brands e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BrandsModule,
        DatabaseModule,
        TypeOrmModule.forFeature([Model, Brand]),
        GraphQLModule.forRoot({
          debug: false,
          playground: true,
          //typePaths: ['./**/*.graphql'],
          autoSchemaFile: 'carSchema.gql',
        }),
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('get all brands', () => {
    const getBrandsQuery = `{
        getBrands{
            name
            origin
        }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getBrandsQuery,
      })
      .expect(({ body }) => {
        expect(body.data.getBrands[1]).toStrictEqual({
          name: 'BMW',
          origin: 'German',
        });
      })
      .expect(200);
  });
  it('get one brand', () => {
    const getOneBrandQuery = `{
          getBrand(name:"Audi"){
              name
              origin
          }
      }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneBrandQuery,
      })
      .expect(({ body }) => {
        expect(body.data.getBrand).toStrictEqual({
          name: 'Audi',
          origin: 'German',
        });
      })
      .expect(200);
  });
});
