import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosModule } from './modules/contact/info.module';
import { UsersModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorsResolver } from './modules/author/author.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootCertificates } from 'tls';
import { Brand } from './modules/brands/brands.entity';
import { Model } from './modules/models/models.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BrandsModule } from './modules/brands/brands.modules';
import { ModelsModule } from './modules/models/models.modules';
import mariadbConfiguration from './config/mariadb';
import mongoConfiguration from './config/mongo';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_STRING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      //typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'carSchema.gql',
    }),
    DatabaseModule,
    /*
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Brand, Model],
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
    }),*/
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    InfosModule,
    UsersModule,
    BrandsModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
