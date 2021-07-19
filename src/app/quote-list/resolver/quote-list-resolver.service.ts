import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DCFComponentGetComponentForViewResult,
  DCFQueryParams,
} from 'src/app/shared/models/dcf.model';
import { DcfService } from 'src/app/shared/services/dcf-services/dcf.service';
import {
  QuoteListResolverData,
  QuotesGetQuotesForViewResult,
  QuotesGetQuotesListForViewParameters,
} from '../models/quote-list.model';
import { QuoteListService } from '../services/quote-list.service';

@Injectable()
export class QuoteListResolverService
  implements Resolve<QuoteListResolverData>
{
  constructor(
    private quoteListService: QuoteListService,
    private dcfService: DcfService
  ) {}
  resolve(): Observable<QuoteListResolverData> {
    const quotesData: QuotesGetQuotesListForViewParameters = {
      bmStatusId: 255,
      changedById: 0,
      creatorId: 2737,
      divisionId: '0',
      lastChangedId: 2018,
      ownerId: 2737,
      showFilter: 2,
      //userId: 2737,
    };
    const dcfParams: DCFQueryParams = { componentId: 12 };
    return forkJoin([
      this.quoteListService.getQuoteList(quotesData),
      this.dcfService.getDcfList(dcfParams),
    ]).pipe(
      map(
        ([result1, result2]: [
          QuotesGetQuotesForViewResult,
          DCFComponentGetComponentForViewResult
        ]) => {
          return {
            quotesGetQuotesForViewResult: result1,
            dcfComponentGetComponentForViewResult: result2,
          };
        }
      )
    );
  }
}
