export interface LoanProjection {
  loanId: string;
  loanNumber: string;
  borrowerName: string;
  coBorrowerName?: string;
  baseLoanAmount: number;
  noteRate: number;
  qualifyingRate: number;
  ltv: number;
  dti: number;
  representativeFico: number;
  milestone: string;
  lockStatus: 'Floating' | 'Locked' | 'Expired' | 'Relocked';
  lockExpirationDate: string;
  lockDaysRemaining: number;
  occupancyType: 'PrimaryResidence' | 'SecondHome' | 'Investment';
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  unitsCount: number;
  appraisedValue: number;
  purchasePrice: number;
  sourceVersion: string;
  isStale: boolean;
}

export interface BannerTileConfig {
  amount: boolean;
  rate: boolean;
  ltv: boolean;
  dti: boolean;
  fico: boolean;
  milestone: boolean;
  lock: boolean;
  occupancy: boolean;
  property: boolean;
}
