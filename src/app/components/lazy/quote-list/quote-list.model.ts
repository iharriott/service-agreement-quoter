import { Subject } from 'rxjs';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

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

export interface SharedFormsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
  compOutput: (event: SharedFormActionsOutputConfig) => void;
}
