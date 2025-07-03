import { BaseEntity } from 'src/domain/entity/base.entity';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('member_audit')
export class MemberAudit extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ name: 'member_id', type: 'numeric', nullable: false })
  @Index()
  memberId: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: MemberLifecycle,
    default: MemberLifecycle.REGISTERED,
  })
  @Index()
  status: MemberLifecycle = MemberLifecycle.REGISTERED;

  @BeforeInsert()
  async generateData() {}
}
