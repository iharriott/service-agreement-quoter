export interface QuotesGetQuoteListForViewDetail {
  quoteId: number;
  revision: number;
  quoteNo: string;
  quoteStatus: string;
  quoteDate: Date;
  customer: string;
  quoteDescription: string;
  quoteOwner: string;
  creator: string;
  daysOutstanding: number;
  contractType: string;
  estimatedByName: string;
  quoteTotal: number;
  totalEquipment: number;
  serialNo: string;
  model: string;
}
