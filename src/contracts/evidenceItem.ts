export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EvidenceItem {
  id: string;
  packetId: string;
  docType: string;
  docTitle: string;
  pageNumber: number;
  boundingBox?: BoundingBox;
  confidence: number;
  ocrSnippet: string;
  observedAt: string;
  reviewedBy?: string;
  reviewStatus: 'unreviewed' | 'accepted' | 'corrected' | 'rejected';
}
