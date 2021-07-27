import { DCFComponentGetComponentForViewResult } from 'src/app/shared/models/dcf.model';
import { DataDefinition } from '../../../../../angular-shared-components/dist/shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';

export interface QuotesGetChangedListForViewDetail {
  changeId: number;
  changeName: string;
  sort: number;
}

export interface QuotesGetCreatorListForViewDetail {
  creatorId: number;
  creatorName: string;
  sort: number;
}

export interface QuotesGetFilterValueListForViewDetail {
  owner: number;
  creator: number;
  changedBy: number;
  lastChanged: number;
  bmStatusId: number;
}

export interface QuotesGetLastChangedListForViewDetail {
  lastChangeId: number;
  lastChangeDesc: string;
}

export interface QuotesGetOwnerListForViewDetail {
  ownerId: number;
  ownerName: string;
  sort: number;
}

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

export interface QuotesGetQuotesForViewResult {
  quotesList: QuotesGetQuoteListForViewDetail[];
  ownerList: QuotesGetOwnerListForViewDetail[];
  lastChangedList: QuotesGetLastChangedListForViewDetail[];
  creatorList: QuotesGetCreatorListForViewDetail[];
  changedList: QuotesGetChangedListForViewDetail[];
  filterValue: QuotesGetFilterValueListForViewDetail[];
}

export interface QuotesGetQuotesListForViewParameters {
  userId?: number;
  showFilter: number;
  ownerId: number;
  creatorId: number;
  divisionId: string;
  changedById: number;
  lastChangedId: number;
  bmStatusId: number;
}

export interface QuoteListResolverData {
  quotesGetQuotesForViewResult?: QuotesGetQuotesForViewResult;
  dcfComponentGetComponentForViewResult?: DataDefinition;
}
