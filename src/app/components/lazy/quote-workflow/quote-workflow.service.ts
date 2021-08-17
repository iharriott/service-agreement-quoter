import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from '../../../shared/models/dcf.model';

import { DcfService } from '../../../shared/services/dcf-services/dcf.service';
import { environment } from '../../../../environments/environment';

import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { QuoteListRoot } from './quote-workflow.model';
import { FormService } from '../../../shared/services/form.service';
import { FormField } from '../../../shared/models/form-field.model';
import { Emitters } from '../quote-reports-workflow-by-owner/emitters/emitters';
@Injectable()
export class QuoteWorkflowService {
  gridData: QuoteListRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  reportFilters: QuoteReportsFilter = Emitters.reportFilter;

  filterConfig: FormField[] | undefined;
  filterData: QuoteReportsFilter | undefined;

  constructor(
    private http: HttpClient,
    private dcfService: DcfService,
    private formService: FormService
  ) {}

  resolve(): Observable<boolean> {
    const quoteReportWorkflowParams: QuoteReportWorkflowParams =
      Emitters.reportParams;

    const dcfParams: DCFQueryParams = { componentId: 3039 };

    //need to remove hardcoding of componentId
    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteWorkflow(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.formService.getConfig('saqQuoteWorkflow'),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition, formConfiguration]: [
            QuoteListRoot,
            DataDefinition,
            any[],
            boolean
          ]) => {
            this.gridData = gridData;
            this.gridDefinition = gridDefinition;
            this.filterConfig = formConfiguration;
            observer.next(true);
            observer.complete();
          }
        );
    });
  }

  getQuoteWorkflow(data: QuoteReportWorkflowParams): Observable<QuoteListRoot> {
    return this.http.post<QuoteListRoot>(environment.QUOTE_WORKFLOW_EP, data);
  }

  /**
   * Function to get Filter data
   * @return Observable<boolean>
   */
  getFilterData(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.filterData = this.reportFilters;
      observer.next(true);
      observer.complete();
    });
  }
}
