import { DeckDTO } from 'src/deck/dtos/deck.dto';
import { DeckService } from 'src/deck/deck.service';
import { CreateDeckDTO } from 'src/deck/dtos/create-deck.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  @Serialize(DeckDTO)
  @Get()
  getAllDeck(
    @CurrentUser() user: { sub: number },
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('rpp', ParseIntPipe) rpp: number = 10,
  ) {
    page = Math.max(page, 1);
    rpp = Math.min(Math.max(rpp, 1), 50);
    return this.deckService.findAll(user.sub, page, rpp);
  }

  @Get(':deckid')
  getOneDeck(
    @CurrentUser() user: { sub: number },
    @Param('deckid') deckId: string,
  ) {
    return this.deckService.findOne(user.sub, deckId);
  }
}
