import { Expose } from 'class-transformer';

export class getUserDTO {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
