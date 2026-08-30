export type CommandState =
  | 'planned'
  | 'consent_verified'
  | 'approved'
  | 'dispatched'
  | 'effect_unknown'
  | 'partial_result'
  | 'causally_verified'
  | 'failed'
  | 'cancelled';

export interface CommandIntent {
  commandId: string;
  loanId: string;
  serviceName: string;
  attemptId: string;
  planDigest: string;
  state: CommandState;
  preconditionsSatisfied: boolean;
  requiredApprovalRoles: string[];
  approvalsReceived: string[];
  causalProofReceipt?: string;
  errorOrHoldReason?: string;
  dispatchedAt?: string;
}
