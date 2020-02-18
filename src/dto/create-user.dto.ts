import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  @IsString()
  password2: string;
}
