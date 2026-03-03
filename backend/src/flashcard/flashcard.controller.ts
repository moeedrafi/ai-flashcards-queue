import { FlashcardService } from 'src/flashcard/flashcard.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post()
  createDeck() {
    return this.flashcardService.create();
  }

  @Patch(':flashcardid')
  updateDeck() {
    return this.flashcardService.update();
  }

  @Delete(':flashcardid')
  removeDeck() {
    return this.flashcardService.delete();
  }

  @Get()
  getAllDeck() {
    return this.flashcardService.findAll();
  }

  @Get(':flashcardid')
  getOneDeck(@Param('flashcardid') flashcardId: string) {
    return this.flashcardService.findOne();
  }
}
