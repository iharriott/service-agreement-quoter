import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  QuotesGetQuotesForViewResult,
  QuotesGetQuotesListForViewParameters,
} from '../models/quote-list.model';
import { Observable } from 'rxjs';

@Injectable()
export class QuoteListService {
  constructor(private http: HttpClient) {}

  getQuoteList(
    data: QuotesGetQuotesListForViewParameters
  ): Observable<QuotesGetQuotesForViewResult> {
    return this.http.post<QuotesGetQuotesForViewResult>(
      environment.QUOTE_LIST_EP,
      data
    );
  }
}
