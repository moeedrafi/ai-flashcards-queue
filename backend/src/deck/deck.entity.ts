import { User } from 'src/user/user.entity';
import { Flashcard } from 'src/flashcard/flashcard.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.deck)
  user: User;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.deck, {
    cascade: true,
  })
  flashcards: Flashcard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
