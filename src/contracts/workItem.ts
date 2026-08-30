import { LensId } from './roleLens';

export type TaskPriority = "urgent" | "high" | "normal" | "low";

export type TaskStatus =
  | "empty"
  | "ready"
  | "in_progress"
  | "waiting_external"
  | "blocked_dependency"
  | "overdue"
  | "completed";

export type TaskToolId =
  | 'calculate_income'
  | 'credit_normalization'
  | 'review_appraisal'
  | 'review_condo'
  | 'insure_loan'
  | 'balance_cd'
  | 'disclose_loan'
  | 'order_services'
  | 'clear_conditions'
  | 'post_closing_fleet';

export interface WorkItem {
  id: string;
  loanId: string;
  loanNumber: string;
  borrowerName: string;
  roleLensId: LensId;
  taskToolId: TaskToolId;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  slaDeadline: string;
  preconditions: string[];
  blockerReason?: string;
  doneCriteria: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
}
