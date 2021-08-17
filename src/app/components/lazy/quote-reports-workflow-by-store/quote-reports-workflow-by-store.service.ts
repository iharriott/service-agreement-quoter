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
import { StoreSummaryRoot } from './quote-reports-workflow-by-store.model';
import { FormService } from '../../../shared/services/form.service';
import { FormField } from '../../../shared/models/form-field.model';
import { Emitters } from '../quote-reports-workflow-by-owner/emitters/emitters';

@Injectable()
export class QuoteReportsWorkflowByStoreService {
  gridData: StoreSummaryRoot | undefined;
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

    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteReportWorkflowByStore(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.formService.getConfig('saqWorkflowByBranch'),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition, formConfiguration]: [
            StoreSummaryRoot,
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

  getQuoteReportWorkflowByStore(
    data: QuoteReportWorkflowParams
  ): Observable<StoreSummaryRoot> {
    return this.http.post<StoreSummaryRoot>(
      environment.QUOTE_REPORT_STORE_EP,
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
