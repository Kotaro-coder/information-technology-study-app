import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { User as UserModel } from './models/user.model';
import { User } from '@prisma/client';
import { GetUserArgs } from './dto/getUser.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  //getUserArgs内のフィールドを増やすと、検索条件を増やせる
  //正直使わない気がする、idとかでよさそう
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }
}
