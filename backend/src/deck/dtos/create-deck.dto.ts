import { IsString } from 'class-validator';

export class CreateDeckDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
