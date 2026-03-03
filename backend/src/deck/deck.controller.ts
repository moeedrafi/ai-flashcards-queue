import { DeckService } from 'src/deck/deck.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Post()
  createDeck() {
    return this.deckService.create();
  }

  @Patch(':deckid')
  updateDeck() {
    return this.deckService.update();
  }

  @Delete(':deckid')
  removeDeck() {
    return this.deckService.delete();
  }

  @Get()
  getAllDeck() {
    return this.deckService.findAll();
  }

  @Get(':deckid')
  getOneDeck(@Param('deckid') deckId: string) {
    return this.deckService.findOne();
  }
}
