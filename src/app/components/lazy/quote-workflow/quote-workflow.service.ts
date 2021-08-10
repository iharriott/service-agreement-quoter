import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from '../../../shared/models/dcf.model';

import { DcfService } from '../../../shared/services/dcf-services/dcf.service';
import { environment } from '../../../../environments/environment';
//import { AppConfig, getConfig } from '../quote-list/mock.data';

import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { QuoteWorkflowSummaryRoot } from './quote-workflow.model';
import { FormService } from '../../../shared/services/form.service';
import { FormField } from 'src/app/shared/models/form-field.model';
@Injectable({
  providedIn: 'root'
})
export class QuoteWorkflowService {
  gridData: QuoteWorkflowSummaryRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  //need to remove hardcoding
  reportFilters: QuoteReportsFilter = {
    year: 2021,
    month: 'All Months',
    branch: 'All Branches',
    owner: 'All Owners',
  };

  filterConfig: FormField[] | undefined;
  filterData: QuoteReportsFilter | undefined;

  constructor(
    private http: HttpClient,
    private dcfService: DcfService,
    private formService: FormService
  ) { }

  resolve(): Observable<boolean> {
    //need to remove hardcoding
    const quoteReportWorkflowParams: QuoteReportWorkflowParams = {
      languageId: 1,
      viewUserId: 2737,
      mode: 'Edit',
      reportYear: 2018,
      reportMonth: 0,
      ownerUserId: 0,
      division: '%',
      storeNumber: '%',
    };
    const dcfParams: DCFQueryParams = { componentId: 3039 };

    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteWorkflow(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.formService.getConfig('saqWorkflowByBranch'),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition, formConfiguration]: [
            QuoteWorkflowSummaryRoot,
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

  getQuoteWorkflow(
    data: QuoteReportWorkflowParams
  ): Observable<QuoteWorkflowSummaryRoot> {
    return this.http.post<QuoteWorkflowSummaryRoot>(
      environment.QUOTE_WORKFLOW_EP,
      data
    );
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
