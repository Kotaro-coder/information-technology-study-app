import { Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/createPlan.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Plan } from '@prisma/client';
import { UpdatePlanInput } from './dto/updatePlan.input';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPlans(userId: number): Promise<Plan[]> {
    // SQLを書かずにデータベース操作
    //node_modulesでplanテーブルにアクセスできる
    return await this.prismaService.plan.findMany({
      where: {
        userId,
      },
    });
  }

  async createPlan(createPlanInput: CreatePlanInput): Promise<Plan> {
    return await this.prismaService.plan.create({
      data: createPlanInput,
    });
  }

  async updatePlan(updatePlanInput: UpdatePlanInput): Promise<Plan> {
    const { id, ...data } = updatePlanInput;
    return await this.prismaService.plan.update({
      data,
      where: {
        id,
      },
    });
  }

  async deletePlan(id: number): Promise<Plan> {
    return await this.prismaService.plan.delete({
      where: {
        id,
      },
    });
  }
}
