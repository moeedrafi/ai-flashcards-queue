import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from 'src/flashcard/flashcard.entity';
import { FlashcardService } from 'src/flashcard/flashcard.service';
import { FlashcardController } from 'src/flashcard/flashcard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard])],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
