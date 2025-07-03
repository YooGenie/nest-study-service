import { CustomColumn } from 'src/domain/custom/custom-column';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseTimeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @CustomColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CustomColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
