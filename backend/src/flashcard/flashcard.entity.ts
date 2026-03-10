import { Deck } from 'src/deck/deck.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @ManyToOne(() => Deck, (deck) => deck.flashcards)
  deck: Deck;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
