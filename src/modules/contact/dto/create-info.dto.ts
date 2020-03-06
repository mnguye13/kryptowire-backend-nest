import { IsString, IsInt } from 'class-validator';

export class CreateInfoDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly fullname: string;
  @IsString()
  readonly email: string;
}
