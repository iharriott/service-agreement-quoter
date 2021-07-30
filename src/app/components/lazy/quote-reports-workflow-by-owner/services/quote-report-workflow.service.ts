import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from 'src/app/shared/models/dcf.model';
import { DcfService } from 'src/app/shared/services/dcf-services/dcf.service';
import { environment } from '../../../../../environments/environment';
import {
  AppConfig,
  MockData,
  getConfig,
  getData,
} from '../../quote-list/mock.data';
import {
  OwnerSummaryRoot,
  QuoteReportWorkflowParams,
} from '../models/quote-reports-workflow-by-owner.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteReportWorkflowService {
  gridData: OwnerSummaryRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  filterConfig: AppConfig[] | undefined;
  filterData: MockData | undefined;
  constructor(private http: HttpClient, private dcfService: DcfService) {}

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
        this.getQuoteReportWorkflowByOwner(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
        this.getFilterConfig(),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition]: [
            OwnerSummaryRoot,
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

  getQuoteReportWorkflowByOwner(
    data: QuoteReportWorkflowParams
  ): Observable<OwnerSummaryRoot> {
    return this.http.post<OwnerSummaryRoot>(environment.QUOTE_REPORT_EP, data);
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
