import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      //findUniqueはunique属性か、主キーでしか検索できない
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('ユーザー見つかりません');
    }
    return user;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
