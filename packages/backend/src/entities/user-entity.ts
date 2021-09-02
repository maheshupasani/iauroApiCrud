import { AccountTypes } from 'src/constant/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product-entity';

@Entity()
export class User extends BaseEntity {
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

  @Column({
    type: 'enum',
    enum: AccountTypes,
    default: AccountTypes.USER,
  })
  role: AccountTypes;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
