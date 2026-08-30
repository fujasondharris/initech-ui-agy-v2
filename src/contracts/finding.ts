export type FindingSeverity = 'hard_stop' | 'warning' | 'info';

export interface Finding {
  id: string;
  ruleCitation: string;
  authority: string;
  severity: FindingSeverity;
  title: string;
  description: string;
  status: 'open' | 'cleared' | 'waived' | 'overridden';
  evidenceRefId?: string;
  resolutionPath?: string;
  clearedBy?: string;
  clearedAt?: string;
}
