import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { QuotesGetQuotesForViewResult } from '../models/quotes-get-quotes-for-view-result.model';
import { QuoteListService } from '../services/quote-list.service';

@Injectable()
export class QuoteListResolverService
  implements Resolve<QuotesGetQuotesForViewResult>
{
  constructor(private quoteListService: QuoteListService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QuotesGetQuotesForViewResult> {
    return this.quoteListService.GetQuoteList();
  }
}
