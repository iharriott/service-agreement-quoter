import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteWorkflowService } from './quote-workflow.service';

@Injectable()
export class QuoteWorkflowResolver implements Resolve<boolean> {
  constructor(private quoteWorkflowService: QuoteWorkflowService) {}
  resolve(): Observable<boolean> {
    return this.quoteWorkflowService.resolve().pipe(take(1));
  }
}
