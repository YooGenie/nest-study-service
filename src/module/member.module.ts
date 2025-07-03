import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { MemberController } from 'src/adapter/inbound/controller/member.controller';
import { MemberRepository } from 'src/adapter/outbound/member.repository';
import { Member } from 'src/domain/entity/member.entity';
import { MemberServiceInPort } from 'src/port/inbound/member-service.in-port';
import { MemberServiceOutPort } from 'src/port/outbound/member-service.out-port';
import { MemberService } from 'src/port/service/member.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Member]),
    // forwardRef(() => MemberInviteModule),
  ],
  controllers: [MemberController],
  providers: [
    { provide: MemberServiceInPort, useClass: MemberService },
    { provide: MemberServiceOutPort, useClass: MemberRepository },
  ],
  exports: [MemberServiceInPort, MemberServiceOutPort],
})
export class MemberModule {}
