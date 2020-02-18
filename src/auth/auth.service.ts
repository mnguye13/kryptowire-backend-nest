import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserDto } from '../dto/validate-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserData') private readonly userModel: Model<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: any) {
    const email = data.email;
    const password = data.password;
    const user = await this.userModel.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = { id: user._id, email: user.email, name: user.name };
      console.log(payload);
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      return { error: 'User not found' };
    }
  }
}
