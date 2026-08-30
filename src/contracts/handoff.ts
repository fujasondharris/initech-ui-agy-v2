import { LensId } from './roleLens';

export interface HandoffEvent {
  id: string;
  loanId: string;
  fromRole: LensId;
  toRole: LensId;
  actor: string;
  notes: string;
  preconditionsMet: boolean;
  status: 'draft' | 'ready' | 'sent' | 'rejected' | 'repaired' | 'acknowledged';
  timestamp: string;
  rejectionReason?: string;
}
