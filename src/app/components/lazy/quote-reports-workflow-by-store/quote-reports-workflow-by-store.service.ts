import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from 'src/app/shared/models/dcf.model';

import { DcfService } from 'src/app/shared/services/dcf-services/dcf.service';
import { environment } from '../../../../environments/environment';
import {
  AppConfig,
  MockData,
  getConfig,
  getData,
} from '../quote-list/mock.data';
import { QuoteReportWorkflowParams } from '../quote-reports-workflow-by-owner/models/quote-reports-workflow-by-owner.model';
import { StoreSummaryRoot } from './quote-reports-workflow-by-store.model';
@Injectable({
  providedIn: 'root'
})
export class QuoteReportsWorkflowByStoreService {

  gridData: StoreSummaryRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  filterConfig: AppConfig[] | undefined;
  filterData: MockData | undefined;
  constructor(private http: HttpClient, private dcfService: DcfService) { }

  resolve(): Observable<boolean> {
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
        this.getQuoteReportWorkflowByStore(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.getFilterConfig(),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition]: [
            StoreSummaryRoot,
            DataDefinition,
            boolean,
            boolean
          ]) => {
            this.gridData = gridData;
            this.gridDefinition = gridDefinition;
            observer.next(true);
            observer.complete();
          }
        );
    });
  }

  getQuoteReportWorkflowByStore(
    data: QuoteReportWorkflowParams
  ): Observable<StoreSummaryRoot> {
    return this.http.post<StoreSummaryRoot>(environment.QUOTE_REPORT_STORE_EP, data);
  }

  /**
   * Function to get Filter configs
   * @return Observable<boolean>
   */
  getFilterConfig(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.filterConfig = getConfig;
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * Function to get Filter data
   * @return Observable<boolean>
   */
  getFilterData(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.filterData = getData;
      observer.next(true);
      observer.complete();
    });
  }

}
