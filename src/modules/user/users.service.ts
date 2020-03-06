import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('UserData') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  /*---*/

  getHello(): string {
    return 'API for Kryptowire Users';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password == createUserDto.password2) {
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      } else {
        console.log('User already exist');
      }
    } else {
      console.log('Password not match');
    }
  }

  async find(validateUserDto: ValidateUserDto) {
    const email = validateUserDto.email;
    const password = validateUserDto.password;
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = { id: user._id, email: user.email, name: user.name };
        console.log(payload);
        return { accessToken: this.jwtService.sign(payload) };
      } else {
        return { error: 'User not found' };
      }
    } else {
      return { error: 'User not found' };
    }
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .updateOne({ _id: id }, { $set: updateUserDto })
      .exec();
  }
}
