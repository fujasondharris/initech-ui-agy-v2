export interface DraftChange {
  id: string;
  fieldKey: string;
  originalValue: any;
  proposedValue: any;
  baseVersion: string;
  currentVersion: string;
  isStale: boolean;
  conflictDetails?: string;
  author: string;
  stagedAt: string;
}
