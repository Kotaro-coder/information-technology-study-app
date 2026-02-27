import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePlanInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  plan_start_time: Date;

  @Field()
  plan_end_time: Date;

  @Field(() => Int)
  userId: number;
}
