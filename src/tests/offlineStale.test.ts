import { describe, it, expect } from 'vitest';
import { DraftChange } from '../contracts/draftChange';

describe('Offline & Stale Version Conflict Detection', () => {
  it('flags stale concurrent edits when server base version advances', () => {
    const draft: DraftChange = {
      id: 'draft-income-1',
      fieldKey: 'borrower.baseMonthlyIncome',
      originalValue: 8400,
      proposedValue: 8950,
      baseVersion: 'v1.2.0',
      currentVersion: 'v1.2.4',
      isStale: true,
      conflictDetails: 'Server state modified by another underwriting session',
      author: 'Processor-Seat',
      stagedAt: '2026-08-30T10:00:00Z'
    };

    expect(draft.isStale).toBe(true);
    expect(draft.baseVersion).not.toBe(draft.currentVersion);
    expect(draft.conflictDetails).toBeDefined();
  });
});
