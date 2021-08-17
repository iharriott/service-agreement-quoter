import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';

@Injectable()
export class QuoteReportsWorkflowByStoreResolver implements Resolve<boolean> {
  constructor(
    private quoteReportsWorkflowService: QuoteReportsWorkflowByStoreService
  ) {}

  resolve(): Observable<boolean> {
    return this.quoteReportsWorkflowService.resolve().pipe(take(1));
  }
}
