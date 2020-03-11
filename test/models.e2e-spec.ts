import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Brand } from '../src/modules/brands/brands.entity';
import { ModelsModule } from '../src/modules/models/models.modules';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Model } from '../src/modules/models/models.entity';
import { ModelPriceInput } from '../src/modules/models/dto/ModelPriceInput';
import { DatabaseModule } from '../src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

describe('Models e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ModelsModule,
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

  it('get all models', () => {
    const getModelsQuery = `{
          getModels{
              label
              year
              price
          }
      }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getModelsQuery,
      })
      .expect(({ body }) => {
        expect(body.data.getModels[2].label).toBe('RS7');
      })
      .expect(200);
  });
  it('get one model', () => {
    const getOneModelQuery = `{
        getModel(label:"M3"){
            label
            year
            price
        }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneModelQuery,
      })
      .expect(({ body }) => {
        expect(body.data.getModel).toStrictEqual({
          label: 'M3',
          year: '2020',
          price: 70000,
        });
      })
      .expect(200);
  });
  it('can update model price', () => {
    const modelPriceUpdateQuery = `mutation{
          updateCarPrice(model:{label:"S3", price:32000}){
              label
              price
          }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: modelPriceUpdateQuery,
      })
      .expect(({ body }) => {
        expect(body.data.updateCarPrice.price).toBe(32000);
      })
      .expect(200);
  });
});
