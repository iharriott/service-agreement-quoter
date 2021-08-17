import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Observer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  QuotesGetQuotesForViewResult,
  QuotesGetQuotesHeaderForViewResult,
} from './quote-overview.model';
import { take } from 'rxjs/operators';

@Injectable()
export class QuoteOverviewService {
  quotesData!: QuotesGetQuotesForViewResult;
  quotesHeaderData!: QuotesGetQuotesHeaderForViewResult;
  constructor(private http: HttpClient) {}

  resolve(quoteId: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([this.getQuotes(1), this.getQuotesHeader(quoteId)])
        .pipe(take(1))
        .subscribe(
          ([data1, data2]: [
            QuotesGetQuotesForViewResult,
            QuotesGetQuotesHeaderForViewResult
          ]) => {
            this.quotesData = data1;
            this.quotesHeaderData = data2;
            observer.next(true);
            observer.complete();
          }
        );
    });
  }

  getQuotes(quoteId: number): Observable<QuotesGetQuotesForViewResult> {
    return this.http.get<QuotesGetQuotesForViewResult>(
      environment.QUOTES_EP + quoteId.toString()
    );
  }

  getQuotesHeader(
    quoteId: number
  ): Observable<QuotesGetQuotesHeaderForViewResult> {
    return this.http.get<QuotesGetQuotesHeaderForViewResult>(
      environment.QUOTES_HEADER_EP + quoteId.toString()
    );
  }
}
