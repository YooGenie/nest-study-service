import * as bcrypt from 'bcryptjs';
import { BaseEntity } from 'src/domain/entity/base.entity';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('member')
export class Member extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  @Index()
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
  async generateData() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
