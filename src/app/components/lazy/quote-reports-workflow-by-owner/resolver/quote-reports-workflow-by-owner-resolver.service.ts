import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteReportWorkflowService } from '../services/quote-report-workflow.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteReportsWorkflowByOwnerResolverService
  implements Resolve<boolean>
{
  constructor(private quoteReportWorkflowService: QuoteReportWorkflowService) {}

  resolve(): Observable<boolean> {
    return this.quoteReportWorkflowService.resolve().pipe(take(1));
  }
}
