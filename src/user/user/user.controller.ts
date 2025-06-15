import { MemberService } from './../member/member.service';
import { UserRepository } from './../user-repository/user-repository';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Inject,
  // Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService')
    private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {} // constructor based inject
  // @Inject()
  // private service: UserService; // property based inject

  @Get('/sample-response')
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello Response',
    };
  }

  @Get('/check-connection')
  checkConnection(): string {
    this.emailService.send();
    this.mailService.send();
    this.memberService.sendEmail();
    console.log(this.memberService.getConnection());
    return this.connection.getName();
  }

  @Post('/create')
  async create(@Body() body: any): Promise<User> {
    const firstName = body.firstName;
    const lastName = body.lastName;
    const result = await this.userRepository.create(firstName, lastName);
    return result;
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/sayHello')
  @HttpCode(200)
  async sayHello(@Query('nama') nama: string): Promise<string> {
    return this.service.sayHello(nama);
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response) {
    res.cookie('name', name);
    res.status(200).send('success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() cookie: Request): string {
    return `cookie = ${cookie.cookies['name']}`;
  }

  @Get('/:id')
  getUser(@Param('id') id: string): string {
    return `data params : ${id}`;
  }

  @Post()
  post(): string {
    return 'method post';
  }

  @Get('/sample')
  get(): string {
    return 'method get';
  }
}
