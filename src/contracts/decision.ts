export interface Decision {
  id: string;
  loanId: string;
  decisionType: 'income_derivation' | 'appraisal_clearance' | 'condo_reciprocity' | 'underwriter_approval';
  status: 'recommended' | 'approved' | 'rejected' | 'superseded';
  context: string;
  authorityRule: string;
  inputs: Record<string, any>;
  alternativesEvaluated: string[];
  rationale: string;
  decidedBy: string;
  decidedAt: string;
}
