import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { QuoteOverviewService } from './quote-overview.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class QuoteOverviewResolver implements Resolve<boolean> {
  constructor(private quoteOverviewService: QuoteOverviewService) {}

  /**
   * Resolver
   */
  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const quoteId: string = route.params['quoteId'];
    return this.quoteOverviewService.resolve(parseInt(quoteId)).pipe(take(1));
  }
}
