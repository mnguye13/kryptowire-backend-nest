import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosModule } from './modules/info.module';
import { UsersModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { CarsResolver } from './graphQL/cars/cars.resolvers';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kevin:26nhan03@cluster0-hfcgn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compa',
    ),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    InfosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CarsResolver],
})
export class AppModule {}
