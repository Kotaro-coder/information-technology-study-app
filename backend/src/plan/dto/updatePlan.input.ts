import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class UpdatePlanInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  //IsOptionalは値が存在するときのみバリデーションを行う
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Field({ nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Field({ nullable: true })
  content?: string;
}
