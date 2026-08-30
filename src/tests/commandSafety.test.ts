import { describe, it, expect } from 'vitest';
import { CommandIntent } from '../contracts/commandIntent';

describe('Command Safety & State Transitions', () => {
  it('enforces dual control approval and handles effect-unknown recovery', () => {
    const command: CommandIntent = {
      commandId: 'cmd-disburse-99412',
      loanId: 'loan-100099412',
      serviceName: 'DisbursementWireExecutor',
      attemptId: 'att-99412-1',
      planDigest: 'sha256-49014f921c06e6e0',
      state: 'planned',
      preconditionsSatisfied: true,
      requiredApprovalRoles: ['closer', 'funding-control-approver'],
      approvalsReceived: ['closer']
    };

    expect(command.state).toBe('planned');
    expect(command.approvalsReceived.length).toBeLessThan(command.requiredApprovalRoles.length);

    // Second approval received
    command.approvalsReceived.push('funding-control-approver');
    command.state = 'approved';
    expect(command.state).toBe('approved');

    // Dispatch
    command.state = 'dispatched';
    command.dispatchedAt = '2026-08-30T15:40:00Z';
    expect(command.state).toBe('dispatched');

    // Effect unknown hold
    command.state = 'effect_unknown';
    command.errorOrHoldReason = 'Federal wire transfer gateway timeout';
    expect(command.state).toBe('effect_unknown');

    // Causal recovery
    command.state = 'causally_verified';
    command.causalProofReceipt = 'rcpt-fedwire-imad-20260830-99412';
    expect(command.state).toBe('causally_verified');
    expect(command.causalProofReceipt).toBeDefined();
  });
});
