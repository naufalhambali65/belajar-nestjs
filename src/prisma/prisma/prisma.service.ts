import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.log(`Creating Prisma Service`);
  }
  onModuleInit() {
    console.log('Connect Prisma');
    this.$connect();
  }
  onModuleDestroy() {
    console.log('Disconnect Prisma');
    this.$disconnect();
  }
}
