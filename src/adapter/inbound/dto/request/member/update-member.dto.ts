import { ApiProperty } from '@nestjs/swagger';

import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @Length(2, 30)
  name: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(32)
  departmentName?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  jobPosition?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(32)
  phoneNumber?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(32)
  mobileNumber?: string;
}
