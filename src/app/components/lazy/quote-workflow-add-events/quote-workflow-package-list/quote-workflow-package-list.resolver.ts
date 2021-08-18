import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { QuoteWorkflowPackageListService } from './quote-workflow-package-list.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteWorkflowPackageListResolver implements Resolve<boolean> {
  constructor(private quoteWorkflowPackageListService: QuoteWorkflowPackageListService) { }
  resolve(): Observable<boolean> {
    return this.quoteWorkflowPackageListService.resolve().pipe(take(1));
  }
}
