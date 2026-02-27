import { PlanStatus } from './planStatus';

export type Plan = {
    id: number;
    name: string;
    dueDate: string;
    status: PlanStatus;
    description: string;
}