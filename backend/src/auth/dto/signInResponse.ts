import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class SignInResponse {
  @Field()
  accessToken: string;

  //認証に成功したユーザー情報を返す
  @Field(() => User)
  user: User;
}
