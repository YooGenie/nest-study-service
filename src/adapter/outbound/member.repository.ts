import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { Member } from 'src/domain/entity/member.entity';
import { MemberLifecycle } from 'src/domain/enum/member-status.enum';
import { MemberServiceOutPort } from 'src/port/outbound/member-service.out-port';

import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class MemberRepository implements MemberServiceOutPort {
  // constructor(
  //   @InjectRepository(Member)
  //   private readonly memberRepository: Repository<Member>,
  // ) {}

  // async save(saveMember: Member): Promise<Member> {
  //   return await this.memberRepository.save(saveMember);
  // }

  // async update(id: number, updateMember: Member): Promise<void> {
  //   await this.memberRepository.update(
  //     id,
  //     updateMember as QueryDeepPartialEntity<Member>,
  //   );
  // }

  async findAll(
    searchMember: SearchMember,
    paginationQuery: PaginationQuery,
  ): Promise<[Member[], number]> {
    const queryOptions: FindManyOptions<Member> = {
      where: {
        id: searchMember.memberId ? searchMember.memberId : undefined,
        uuid: searchMember.memberUUID ? searchMember.memberUUID : undefined,
        tenantId: searchMember.tenantId ? searchMember.tenantId : undefined,
        tenantUUID: searchMember.tenantUUID
          ? searchMember.tenantUUID
          : undefined,
        status: searchMember.status ? searchMember.status : undefined,
      },
      order: { id: 'DESC' },
      skip: paginationQuery.skip,
      take: paginationQuery.countPerPage,
    };

    // const [members, totalCount] =
    //   await this.memberRepository.findAndCount(queryOptions);

    return [[], 0];
  }

  async findById(
    id: number,
    tenantId?: number,
    siteId?: number,
    statuses?: MemberLifecycle | MemberLifecycle[],
  ): Promise<Member | null> {
    const queryOptions: FindOneOptions<Member> = {
      where: {
        id: id,
        tenantId: tenantId ? tenantId : undefined,
        siteId: siteId ? siteId : undefined,
      },
    };

    if (statuses) {
      const statusArray = Array.isArray(statuses) ? statuses : [statuses];
      queryOptions.where = { ...queryOptions.where, status: In(statusArray) };
    }
    //await this.memberRepository.findOne(queryOptions);
    return null;
  }

  async findByTenantMember(
    tenantId: number,
    status?: MemberLifecycle,
  ): Promise<Member | null> {
    const queryOptions: FindOneOptions<Member> = {
      where: {
        tenantId: tenantId,
      },
    };

    if (status) {
      queryOptions.where = { ...queryOptions.where, status };
    }

    // return await this.memberRepository.findOne(queryOptions);
    return null;
  }
}
