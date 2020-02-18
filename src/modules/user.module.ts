import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { UserData } from '../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategy } from '../auth/local.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forFeature([{ name: 'UserData', schema: UserData }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, LocalStrategy],
  exports: [UsersService],
})
export class UsersModule {}
