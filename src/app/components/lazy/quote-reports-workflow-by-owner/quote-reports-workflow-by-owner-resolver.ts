import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteReportsWorkflowByOwnerService } from './quote-reports-workflow-by-owner.service';

@Injectable()
export class QuoteReportsWorkflowByOwnerResolver implements Resolve<boolean> {
  constructor(
    private quoteReportsWorkflowByOwnerService: QuoteReportsWorkflowByOwnerService
  ) {}

  resolve(): Observable<boolean> {
    return this.quoteReportsWorkflowByOwnerService.resolve().pipe(take(1));
  }
}
