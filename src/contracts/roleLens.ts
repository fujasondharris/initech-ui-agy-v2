export type LensId =
  | "originator"
  | "setup"
  | "processor"
  | "underwriter"
  | "compliance"
  | "closing"
  | "funding"
  | "funding-control-approver"
  | "shipping"
  | "insurance"
  | "secondary"
  | "collateral"
  | "manager"
  | "quality-control"
  | "administrator"
  | "auditor"
  | "security-administrator"
  | "infrastructure-data-custodian"
  | "separated-approver"
  | "support-recovery-operator";

export type LensCategory =
  | "loan-operations"
  | "credit-decision"
  | "control"
  | "controlled-effect"
  | "independent-approval"
  | "post-close"
  | "capital-markets"
  | "specialist"
  | "management"
  | "independent-review"
  | "administration"
  | "lender-custody"
  | "operations";

export interface RoleLens {
  id: LensId;
  displayName: string;
  category: LensCategory;
}

export interface LensGroup {
  id: "all" | "all-operational" | "all-specialist";
  lensIds: LensId[];
}
