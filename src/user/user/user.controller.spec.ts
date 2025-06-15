import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from '../connection/connection';
import * as process from 'process';
import { mailService, MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService, // Standard Provider
        {
          provide: Connection, // Class Provider
          useClass:
            process.env.DATABASE == 'mysql'
              ? MySQLConnection
              : MongoDBConnection,
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
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', async () => {
    const response = await controller.sayHello('Naufal');
    expect(response).toBe('Hello Naufal');
  });
});
