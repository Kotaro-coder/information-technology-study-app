import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Plan {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  status: Status;

  @Field({ nullable: true })
  content: string;

  @Field()
  plan_start_time: Date;

  @Field()
  plan_end_time: Date;

  @Field({ nullable: true })
  work_start_time: Date;

  @Field({ nullable: true })
  work_end_time: Date;
}
