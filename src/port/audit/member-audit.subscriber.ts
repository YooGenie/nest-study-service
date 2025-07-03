import { MemberAudit } from 'src/domain/entity/member-audit.entity';
import { Member } from 'src/domain/entity/member.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class MemberAuditSubscriber
  implements EntitySubscriberInterface<Member>
{
  listenTo() {
    return Member;
  }

  async afterInsert(event: InsertEvent<Member>) {
    if (event.entity) {
      const memberAudit = new MemberAudit();
      memberAudit.memberId = event.entity.id;
      memberAudit.email = event.entity.email;
      memberAudit.phoneNumber = event.entity.phoneNumber;
      memberAudit.mobileNumber = event.entity.mobileNumber;
      memberAudit.tenantId = event.entity.tenantId;
      memberAudit.name = event.entity.name;
      memberAudit.isMarketingConsent = event.entity.isMarketingConsent;
      memberAudit.departmentName = event.entity.departmentName;
      memberAudit.jobPosition = event.entity.jobPosition;
      memberAudit.imageUrl = event.entity.imageUrl;
      memberAudit.status = event.entity.status;
      memberAudit.passwordToken = event.entity.passwordToken;
      memberAudit.createdBy = event.entity.createdBy;
      memberAudit.updatedBy = event.entity.updatedBy;

      await event.manager.save(memberAudit);
    }
  }

  async afterUpdate(event: UpdateEvent<Member>) {
    if (event.entity) {
      const memberAudit = new MemberAudit();
      memberAudit.memberId = event.entity.id;
      memberAudit.email = event.entity.email;
      memberAudit.phoneNumber = event.entity.phoneNumber;
      memberAudit.mobileNumber = event.entity.mobileNumber;
      memberAudit.tenantId = event.entity.tenantId;
      memberAudit.name = event.entity.name;
      memberAudit.isMarketingConsent = event.entity.isMarketingConsent;
      memberAudit.departmentName = event.entity.departmentName;
      memberAudit.jobPosition = event.entity.jobPosition;
      memberAudit.imageUrl = event.entity.imageUrl;
      memberAudit.status = event.entity.status;
      memberAudit.passwordToken = event.entity.passwordToken;
      memberAudit.createdBy = event.entity.createdBy;
      memberAudit.updatedBy = event.entity.updatedBy;

      await event.manager.save(memberAudit);
    }
  }

  async afterRemove(event: RemoveEvent<Member>) {
    if (event.entity) {
      const memberAudit = new MemberAudit();
      memberAudit.memberId = event.entity.id;
      memberAudit.email = event.entity.email;
      memberAudit.phoneNumber = event.entity.phoneNumber;
      memberAudit.mobileNumber = event.entity.mobileNumber;
      memberAudit.tenantId = event.entity.tenantId;
      memberAudit.name = event.entity.name;
      memberAudit.isMarketingConsent = event.entity.isMarketingConsent;
      memberAudit.departmentName = event.entity.departmentName;
      memberAudit.jobPosition = event.entity.jobPosition;
      memberAudit.imageUrl = event.entity.imageUrl;
      memberAudit.status = event.entity.status;
      memberAudit.passwordToken = event.entity.passwordToken;
      memberAudit.createdBy = event.entity.createdBy;
      memberAudit.updatedBy = event.entity.updatedBy;

      await event.manager.save(memberAudit);
    }
  }
}
