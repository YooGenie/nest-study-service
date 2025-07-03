import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @Expose()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @Length(8, 20)
  @Expose()
  password: string;

  @ApiProperty({ type: Number, required: false, default: 0 })
  @Optional()
  @IsNumber()
  @Expose()
  @Transform(({ value }) => value ?? 0)
  tenantId: number | null = null;

  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsString()
  @Expose()
  @Transform(({ value }) => value ?? '')
  tenantUUID: string | null = null;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @Length(2, 30)
  @Expose()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MaxLength(32)
  @Expose()
  departmentName: string;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @Expose()
  isMarketingConsent: boolean;
}
