import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Flashcard } from 'src/flashcard/flashcard.entity';
import { UpdateFlashcardDTO } from 'src/flashcard/dtos/update-flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(Flashcard) private repo: Repository<Flashcard>,
  ) {}

  async create(userId: number, deckId: string) {}

  async update(userId: number, flashcardId: string, dto: UpdateFlashcardDTO) {
    const result = await this.repo.update(
      { id: flashcardId, deck: { user: { id: userId } } },
      { front: dto.front, back: dto.back },
    );

    if (result.affected === 0) {
      throw new NotFoundException('flashcard not found');
    }

    return { message: 'Updated flashcard successfully' };
  }

  async delete(userId: number, flashcardId: string) {
    const result = await this.repo.delete({
      id: flashcardId,
      deck: { user: { id: userId } },
    });

    if (result.affected == 0) {
      throw new NotFoundException('flashcard not found');
    }

    return { message: 'Deleted flashcard Successfully' };
  }

  async findAll(
    userId: number,
    flashcardId: string,
    page: number,
    rpp: number,
  ) {
    const [flashcards, totalItems] = await this.repo.findAndCount({
      where: { id: flashcardId, deck: { user: { id: userId } } },
      select: ['id', 'front', 'back'],
      order: { createdAt: 'DESC' },
      skip: rpp * (page - 1),
      take: rpp,
    });

    return {
      data: flashcards,
      message: 'Fetched all flashcards successfully',
      meta: {
        page,
        rpp,
        totalItems,
        totalPages: Math.ceil(totalItems / rpp),
      },
    };
  }

  async findOne(userId: number, flashcardId: string) {
    const flashcard = await this.repo.findOne({
      where: { id: flashcardId, deck: { user: { id: userId } } },
    });

    if (!flashcard) throw new NotFoundException('flashcard not found');

    return {
      data: flashcard,
      message: 'Fetched flashcard successfully',
    };
  }
}
