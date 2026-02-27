import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan as PlanModel } from './models/plan.model';
import { CreatePlanInput } from './dto/createPlan.input';
import { Plan } from '@prisma/client';
import { UpdatePlanInput } from './dto/updatePlan.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  //PlanModelにそってデータを返す
  @Query(() => [PlanModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard)
  async getPlans(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Plan[]> {
    return await this.planService.getPlans(userId);
  }

  @Mutation(() => PlanModel)
  @UseGuards(JwtAuthGuard)
  async createPlan(
    @Args('createPlanInput') createPlanInput: CreatePlanInput,
  ): Promise<Plan> {
    return await this.planService.createPlan(createPlanInput);
  }

  @Mutation(() => PlanModel)
  @UseGuards(JwtAuthGuard)
  async updatePlan(
    @Args('updatePlanInput') updatePlanInput: UpdatePlanInput,
  ): Promise<Plan> {
    return await this.planService.updatePlan(updatePlanInput);
  }

  @Mutation(() => PlanModel)
  @UseGuards(JwtAuthGuard)
  async deletePlan(@Args('id', { type: () => Int }) id: number): Promise<Plan> {
    return await this.planService.deletePlan(id);
  }
}
