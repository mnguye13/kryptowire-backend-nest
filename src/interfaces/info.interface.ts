import { Document } from 'mongoose';

export interface Info extends Document {
  readonly id: number;
  readonly fullname: string;
  readonly email: string;
}
