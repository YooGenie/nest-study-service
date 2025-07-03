import { BaseTimeEntity } from 'src/domain/entity/base-time.entity';
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity extends BaseTimeEntity {
  [propertyName: string]: unknown;

  // @PrimaryGeneratedColumn('increment', { type: 'integer' })
  // id: number;

  @Column({ name: 'created_by', type: 'integer', nullable: false })
  @Index()
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer', nullable: false })
  @Index()
  updatedBy: number;
}
