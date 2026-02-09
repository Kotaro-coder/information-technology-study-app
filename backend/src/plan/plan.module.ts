import { Module } from '@nestjs/common';
import { PlanResolver } from './plan.resolver';
import { PlanService } from './plan.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PlanResolver, PlanService],
})
export class PlanModule {}
