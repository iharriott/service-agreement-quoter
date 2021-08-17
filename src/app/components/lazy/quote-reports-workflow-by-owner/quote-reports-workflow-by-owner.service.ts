import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from '../../../shared/models/dcf.model';
import { DcfService } from '../../../shared/services/dcf-services/dcf.service';

import { environment } from '../../../../environments/environment';
import {
  OwnerSummaryRoot,
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from './quote-reports-workflow-by-owner.model';
import { FormService } from '../../../shared/services/form.service';
import { FormField } from '../../../shared/models/form-field.model';
import { Emitters } from './emitters/emitters';

@Injectable()
export class QuoteReportsWorkflowByOwnerService {
  gridData: OwnerSummaryRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  filterConfig: FormField[] | undefined;
  filterData: QuoteReportsFilter | undefined;

  reportFilters: QuoteReportsFilter = Emitters.reportFilter;

  constructor(
    private http: HttpClient,
    private dcfService: DcfService,
    private formServie: FormService
  ) {}

  resolve(): Observable<boolean> {
    const quoteReportWorkflowParams: QuoteReportWorkflowParams =
      Emitters.reportParams;

    const dcfParams: DCFQueryParams = { componentId: 3039 };

    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteReportWorkflowByOwner(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.formServie.getConfig('saqWorkflowByOwner'),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition, formConfiguration]: [
            OwnerSummaryRoot,
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

  getQuoteReportWorkflowByOwner(
    data: QuoteReportWorkflowParams
  ): Observable<OwnerSummaryRoot> {
    return this.http.post<OwnerSummaryRoot>(
      environment.QUOTE_REPORT_OWNER_EP,
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
