import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuotesGetQuotesForViewResult } from '../models/quotes-get-quotes-for-view-result.model';
import { Observable } from 'rxjs';

@Injectable()
export class QuoteListService {
  constructor(private http: HttpClient) {}

  GetQuoteList(): Observable<QuotesGetQuotesForViewResult> {
    return this.http.get<QuotesGetQuotesForViewResult>(
      `${environment.baseApiUrl}/csaq/quote/list`
    );
  }
}
