import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { IShortener } from './IShortener';
import User from '../../../modules/users/entity/User';

@Entity('shorteners')
class Shortener implements IShortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: true,
  })
  userId: string | null;

  @Column({
    name: 'origin_url',
  })
  originUrl: string;

  @Column({
    name: 'short_url',
  })
  shortUrl: string;

  @Column({
    default: 0,
  })
  visits: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => User, (user) => user.links, {
    onDelete: 'NO ACTION',
  })
  user?: User;
}

export default Shortener;
