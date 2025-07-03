import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';

export class SearchMember {
  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  memberId: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  memberUUID: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  tenantId: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  tenantUUID: string;

  @ApiProperty({ enum: MemberLifecycle, required: false })
  @IsOptional()
  @IsEnum(MemberLifecycle)
  status: MemberLifecycle;
}
