import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.log(`Create User Repository`);
  }

  async create(firstName: string, lastName?: string): Promise<User> {
    const result = await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
    return result;
  }
}
