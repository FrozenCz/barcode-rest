import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('barcodes', { orderBy: { name: 'ASC' } })
export class BarcodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  found: boolean;

  @ManyToOne(() => LocationEntity, (LocationEntity) => LocationEntity.uuid, {
    eager: true,
    nullable: true,
  })
  Location: LocationEntity;
}
