import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePlanInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => Int)
  userId: number;
}
