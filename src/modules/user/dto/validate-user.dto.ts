import { IsString, IsInt } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
}
