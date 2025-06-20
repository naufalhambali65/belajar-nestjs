import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService, // Standard Provider
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService, // Value Provider
      useValue: mailService,
    },
    UserRepository,
    {
      provide: 'EmailService', // Alias Provider
      useExisting: MailService,
    },
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
