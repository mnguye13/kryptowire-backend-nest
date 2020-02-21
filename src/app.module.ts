import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosModule } from './info/info.module';
import { UsersModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorsResolver } from './graphQL/author/author.resolvers';
import { CarsModule } from './graphQL/cars/cars.module';
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
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver],
})
export class AppModule {}
