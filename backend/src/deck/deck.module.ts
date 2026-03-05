import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from 'src/deck/deck.entity';
import { UserModule } from 'src/user/user.module';
import { DeckService } from 'src/deck/deck.service';
import { DeckController } from 'src/deck/deck.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), UserModule],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
