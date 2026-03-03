import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flashcard } from 'src/flashcard/flashcard.entity';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(Flashcard) private repo: Repository<Flashcard>,
  ) {}

  create() {}

  update() {}

  delete() {}

  findAll() {}

  findOne() {}
}
