import { ApiProperty } from '@nestjs/swagger';

import { faker } from '@faker-js/faker';
import { Expose } from 'class-transformer';

export class ResponseTokenDto {
  @ApiProperty({ type: String, example: faker.internet.jwt() })
  @Expose()
  accessToken: string;

  @ApiProperty({ type: String, example: faker.internet.jwt() })
  @Expose()
  refreshToken: string;

  @ApiProperty({ type: Date, nullable: true })
  @Expose()
  lastLoginAt?: Date | null;

  @ApiProperty({ type: Boolean, nullable: true })
  @Expose()
  isFirst?: boolean;
}
