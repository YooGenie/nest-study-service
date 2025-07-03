import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';

export class MemberResponseDto {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String, format: 'email' })
  @Expose()
  email: string;

  @ApiProperty({ type: String })
  @Expose()
  mobileNumber: string;

  @ApiProperty({ enum: MemberLifecycle })
  @Expose()
  status: MemberLifecycle;

  @ApiProperty({ type: Number })
  @Expose()
  createdBy: number;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: Number })
  @Expose()
  updatedBy: number;

  @ApiProperty({ type: Date })
  @Expose()
  updatedAt: Date;
}
