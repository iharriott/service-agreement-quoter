import { QuotesGetQuoteListForViewDetail } from './quotes-get-quote-list-for-view-detail.model';
import { QuotesGetOwnerListForViewDetail } from './quotes-get-owner-list-for-view-detail.model';
import { QuotesGetLastChangedListForViewDetail } from './quotes-get-last-changed-list-for-view-detail.model';
import { QuotesGetCreatorListForViewDetail } from './quotes-get-creator-list-for-view-detail.model';
import { QuotesGetChangedListForViewDetail } from './quotes-get-changed-list-for-view-detail.model';
import { QuotesGetFilterValueListForViewDetail } from './quotes-get-filter-value-list-for-view-detail.model';

export interface QuotesGetQuotesForViewResult {
  quotesList: QuotesGetQuoteListForViewDetail[];
  ownerList: QuotesGetOwnerListForViewDetail[];
  lastChangedList: QuotesGetLastChangedListForViewDetail[];
  creatorList: QuotesGetCreatorListForViewDetail[];
  changedList: QuotesGetChangedListForViewDetail[];
  filterValue: QuotesGetFilterValueListForViewDetail[];
}
