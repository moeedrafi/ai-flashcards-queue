import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from 'src/deck/deck.entity';

@Injectable()
export class DeckService {
  constructor(@InjectRepository(Deck) private repo: Repository<Deck>) {}

  create() {}

  update() {}

  delete() {}

  findAll() {}

  findOne() {}
}
