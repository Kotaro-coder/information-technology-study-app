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
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  plan_start_time?: Date;

  @Field({ nullable: true})
  @IsDateString()
  @IsOptional()
  plan_end_time?: Date;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  work_start_time?: Date;

  @Field({ nullable: true})
  @IsDateString()
  @IsOptional()
  work_end_time?: Date;
}
