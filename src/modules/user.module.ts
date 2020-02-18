import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { UserData } from '../schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserData', schema: UserData }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
