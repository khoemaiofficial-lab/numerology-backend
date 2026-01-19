import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // API Tính toán: POST http://localhost:3000/users/calculate
  @Post('calculate')
  async calculate(@Body() body: { name: string, email: string, birthday: string }) {
    return this.usersService.createOrUpdateUser(body.name, body.email, body.birthday);
  }

  // API Xem lịch sử: GET http://localhost:3000/users/history
  @Get('history')
  async getHistory() {
    return this.usersService.findAll();
  }
}