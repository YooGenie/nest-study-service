import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from 'src/adapter/inbound/dto/common/pagination.dto';
import { PaginationQuery } from 'src/adapter/inbound/dto/pagination';
import { SearchMember } from 'src/adapter/inbound/dto/request/member/search-member.dto';
import { MemberResponseDto } from 'src/adapter/inbound/dto/response/member/member-response.dto';
import { ApiSuccessResponse } from 'src/adapter/inbound/dto/swagger.decorator';
import { MemberServiceInPort } from 'src/port/inbound/member-service.in-port';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberServiceInPort) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'TENANT_MASTER Tenant Member search' })
  @ApiSuccessResponse(200, MemberResponseDto, { paginated: true })
  // @UseGuards(JwtAuthGuard, MemberRolesGuard)
  // @Roles(TenantMemberRole.ROLE_TENANT_MASTER)
  @Get('/')
  async findAll(
    // @MemberToken() tokenPayload: MemberAccessTokenPayload,
    @Query() searchMember: SearchMember,
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginationResponse<MemberResponseDto>> {
    // searchMember.tenantId = tokenPayload.tenantId;
    return await this.memberService.findAll(searchMember, paginationQuery);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'TENANT_USER my member information' })
  @ApiSuccessResponse(200, MemberResponseDto)
  // @UseGuards(JwtAuthGuard, MemberRolesGuard)
  // @Roles(TenantMemberRole.ROLE_TENANT_USER)
  @Get(':id')
  async findById(
    @Param('id') id: string, // @MemberToken() tokenPayload: MemberAccessTokenPayload,
  ): Promise<MemberResponseDto> {
    return await this.memberService.findById(Number(id));
  }
}
