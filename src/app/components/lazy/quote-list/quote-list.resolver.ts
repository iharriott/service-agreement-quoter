import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { QuoteListService } from './quote-list.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class QuoteListResolver implements Resolve<boolean> {
  constructor(private quoteListService: QuoteListService) {}

  /**
   * Resolver
   */
  resolve(): Observable<boolean> {
    return this.quoteListService.resolve().pipe(take(1));
  }
}
