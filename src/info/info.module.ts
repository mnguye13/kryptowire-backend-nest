import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfosController } from './info.controller';
import { InfosService } from './infos.service';
import { InfoData } from './schema/info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'InfoData', schema: InfoData }]),
  ],
  controllers: [InfosController],
  providers: [InfosService],
})
export class InfosModule {}
