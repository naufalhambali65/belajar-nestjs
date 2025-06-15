import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MailService } from '../mail/mail.service';
import { Connection } from '../connection/connection';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}

  sendEmail(): void {
    this.moduleRef.get(MailService).send();
  }

  getConnection(): string {
    const result = this.moduleRef.get(Connection);
    return result.getName();
  }
}
