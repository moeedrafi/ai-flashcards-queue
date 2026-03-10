import { IsOptional, IsString } from 'class-validator';

export class UpdateFlashcardDTO {
  @IsString()
  @IsOptional()
  front: string;

  @IsString()
  @IsOptional()
  back: string;
}
