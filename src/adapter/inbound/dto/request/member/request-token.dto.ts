import { ApiProperty } from '@nestjs/swagger';

import { faker } from '@faker-js/faker';
import { IsJWT } from 'class-validator';

export class RequestTokenDto {
  @ApiProperty({ type: String, example: faker.internet.jwt() })
  @IsJWT()
  refreshToken: string;
}
