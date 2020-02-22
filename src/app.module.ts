import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosModule } from './modules/info/info.module';
import { UsersModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorsResolver } from './modules/author/author.resolvers';
import { CarsModule } from './modules/cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootCertificates } from 'tls';
import { Brand } from './modules/cars/brands/brands.entity';
import { Model } from './modules/cars/models/models.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kevin:26nhan03@cluster0-hfcgn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compa',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Brand, Model],
      synchronize: true,
    }),

    InfosModule,
    UsersModule,
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver],
})
export class AppModule {}
