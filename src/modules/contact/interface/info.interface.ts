import { Document } from 'mongoose';

export interface Info extends Document {
  readonly id: string;
  readonly fullname: string;
  readonly email: string;
}
