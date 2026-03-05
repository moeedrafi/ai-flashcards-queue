import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(userId: number, page: number, rpp: number) {
    const [decks, totalItems] = await this.repo.findAndCount({
      where: { user: { id: userId } },
      select: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
      skip: rpp * (page - 1),
      take: rpp,
    });

    return {
      data: decks,
      message: 'Fetched all decks successfully',
      meta: {
        page,
        rpp,
        totalItems,
        totalPages: Math.ceil(totalItems / rpp),
      },
    };
  }

  async findOne(userId: number, deckId: string) {
    if (!deckId) throw new NotFoundException('deck not found');

    const deck = await this.repo.findOne({
      where: { id: deckId, user: { id: userId } },
    });

    if (!deck) throw new NotFoundException('deck not found');

    return {
      data: deck,
      message: 'Fetched deck successfully',
    };
  }
}
