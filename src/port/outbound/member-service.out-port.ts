import { PaginationQuery } from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { Member } from 'src/domain/entity/member.entity';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';

export abstract class MemberServiceOutPort {
  // abstract save(saveMember: Member): Promise<Member>;

  // abstract update(id: number, updateMember: Member): Promise<void>;

  abstract findAll(
    searchMember: SearchMember,
    paginationQuery: PaginationQuery,
  ): Promise<[Member[], number]>;

  abstract findById(
    id: number,
    tenantId?: number,
    siteId?: number,
    statuses?: MemberLifecycle | MemberLifecycle[],
  ): Promise<Member | null>;
}
