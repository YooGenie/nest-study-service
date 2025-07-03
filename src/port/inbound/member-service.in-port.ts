import { PaginationResponse } from 'src/adapter/inbound/dto/common/pagination.dto';
import { PaginationQuery } from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { MemberResponseDto } from 'src/adapter/inbound/dto/response/member/member-response.dto';

export abstract class MemberServiceInPort {
  abstract findAll(
    searchMember: SearchMember,
    paginationQuery: PaginationQuery,
  ): Promise<PaginationResponse<MemberResponseDto>>;

  abstract findById(id: number): Promise<MemberResponseDto>;
}
