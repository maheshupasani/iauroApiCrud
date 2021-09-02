import { AccountTypes } from 'src/constant/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user-entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  modifiedOn: Date;

  @DeleteDateColumn()
  deletedOn: Date;

  @Column()
  createdBy: string;

  @Column()
  modifiedBy: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: true })
  isVisible: boolean;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
