import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteReportWorkflowByOwnerService } from './quote-report-workflow-by-owner.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteReportsWorkflowByOwnerResolver implements Resolve<boolean> {
  constructor(
    private quoteReportWorkflowByOwnerService: QuoteReportWorkflowByOwnerService
  ) {}

  resolve(): Observable<boolean> {
    return this.quoteReportWorkflowByOwnerService.resolve().pipe(take(1));
  }
}
