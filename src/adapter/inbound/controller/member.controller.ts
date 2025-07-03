import { Controller, Param, Query } from '@nestjs/common';
import { PaginationResponse } from 'src/adapter/inbound/dto/common/pagination.dto';
import { PaginationQuery } from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { MemberResponseDto } from 'src/adapter/inbound/dto/response/member/member-response.dto';
import { MemberServiceInPort } from 'src/port/inbound/member-service.in-port';
import { TypedRoute } from '@nestia/core';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberServiceInPort) {}

  @TypedRoute.Get('/')
  async findAll(
    @Query() query: SearchMember & PaginationQuery,
  ): Promise<PaginationResponse<MemberResponseDto>> {
    return await this.memberService.findAll(
      query as SearchMember,
      query as PaginationQuery,
    );
  }

  @TypedRoute.Get(':id')
  async findById(@Param('id') id: string): Promise<MemberResponseDto> {
    return await this.memberService.findById(Number(id));
  }
}
