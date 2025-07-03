import { Inject, Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { PaginationResponse } from 'src/adapter/inbound/dto/common/pagination.dto';
import {
  Pagination,
  PaginationQuery,
} from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { MemberResponseDto } from 'src/adapter/inbound/dto/response/member/member-response.dto';
import { Member } from 'src/domain/entity/member.entity';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';
import { CustomException } from 'src/exception/custom.exception';
import { ErrorCode } from 'src/exception/error-code.eum';
import { MemberServiceInPort } from 'src/port/inbound/member-service.in-port';
import { MemberServiceOutPort } from 'src/port/outbound/member-service.out-port';

@Injectable()
export class MemberService implements MemberServiceInPort {
  constructor(private readonly memberServiceOutPort: MemberServiceOutPort) {}

  async findAll(
    searchMember: SearchMember,
    paginationQuery: PaginationQuery,
  ): Promise<PaginationResponse<MemberResponseDto>> {
    const [members, totalCount] = await this.memberServiceOutPort.findAll(
      searchMember,
      paginationQuery,
    );
    const pagination = new Pagination({ totalCount, paginationQuery });

    return new PaginationResponse([], pagination);
  }

  async findById(id: number): Promise<MemberResponseDto> {
    const selectedMember = await this.memberServiceOutPort.findById(id);
    if (selectedMember === null) {
      throw new CustomException(ErrorCode.NOT_FOUND_MEMBER);
    }

    return selectedMember;
  }
}
