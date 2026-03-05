import { DeckService } from 'src/deck/deck.service';
import { CreateDeckDTO } from 'src/deck/dtos/create-deck.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Post()
  createDeck(
    @Body() body: CreateDeckDTO,
    @CurrentUser() user: { sub: number },
  ) {
    return this.deckService.create(body, user.sub);
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
