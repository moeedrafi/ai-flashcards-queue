import { FlashcardService } from 'src/flashcard/flashcard.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateFlashcardDTO } from 'src/flashcard/dtos/update-flashcard.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post(':deckid')
  createFlashcard(
    @CurrentUser() user: { sub: number },
    @Param('deckid', ParseUUIDPipe) deckId: string,
  ) {
    // TODO: UPLOAD FILE
    return this.flashcardService.create(user.sub, deckId);
  }

  @Patch(':flashcardid')
  updateFlashcard(
    @CurrentUser() user: { sub: number },
    @Param('flashcardid', ParseUUIDPipe) flashcardId: string,
    @Body() body: UpdateFlashcardDTO,
  ) {
    return this.flashcardService.update(user.sub, flashcardId, body);
  }

  @Delete(':flashcardid')
  removeDeck(
    @CurrentUser() user: { sub: number },
    @Param('flashcardid', ParseUUIDPipe) flashcardId: string,
  ) {
    return this.flashcardService.delete(user.sub, flashcardId);
  }

  @Get(':flashcardid')
  getAllFlashcard(
    @CurrentUser() user: { sub: number },
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('rpp', ParseIntPipe) rpp: number = 10,
    @Param('flashcardid', ParseUUIDPipe) flashcardId: string,
  ) {
    page = Math.max(page, 1);
    rpp = Math.min(Math.max(rpp, 1), 50);
    return this.flashcardService.findAll(user.sub, flashcardId, page, rpp);
  }

  @Get(':flashcardid')
  getOneFlashcard(
    @CurrentUser() user: { sub: number },
    @Param('flashcardid', ParseUUIDPipe) flashcardId: string,
  ) {
    return this.flashcardService.findOne(user.sub, flashcardId);
  }
}
