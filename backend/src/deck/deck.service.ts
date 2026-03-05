import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from 'src/deck/deck.entity';
import { UserService } from 'src/user/user.service';
import { CreateDeckDTO } from 'src/deck/dtos/create-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck) private repo: Repository<Deck>,
    private userService: UserService,
  ) {}

  async create(data: CreateDeckDTO, userId: number) {
    const deck = this.repo.create({
      ...data,
      user: { id: userId },
    });

    const savedDeck = await this.repo.save(deck);

    return { data: savedDeck, message: 'Created deck successfully' };
  }

  update() {}

  delete() {}

  findAll() {}

  findOne() {}
}
