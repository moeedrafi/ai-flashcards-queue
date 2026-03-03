import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from 'src/deck/deck.entity';
import { DeckService } from 'src/deck/deck.service';
import { DeckController } from 'src/deck/deck.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
