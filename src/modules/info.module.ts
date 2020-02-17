import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfosController } from '../controllers/info.controller';
import { InfosService } from '../services/infos.service';
import { InfoData } from '../schemas/info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'InfoData', schema: InfoData }]),
  ],
  controllers: [InfosController],
  providers: [InfosService],
})
export class InfosModule {}
