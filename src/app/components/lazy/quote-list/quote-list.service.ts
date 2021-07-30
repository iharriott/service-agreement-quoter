import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  QuotesGetQuotesForViewResult,
  QuotesGetQuotesListForViewParameters,
} from './quote-list.model';
import { forkJoin, Observable, Observer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DCFQueryParams } from '../../../shared/models/dcf.model';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DcfService } from '../../../shared/services/dcf-services/dcf.service';
import { take } from 'rxjs/operators';
import { AppConfig, getConfig, getData, MockData } from './mock.data';

@Injectable()
export class QuoteListService {
  quotesData: QuotesGetQuotesForViewResult | undefined;
  dataDefinition: DataDefinition | undefined;

  filterConfig: AppConfig[] | undefined;
  filterData: MockData | undefined;

  constructor(private http: HttpClient, private dcfService: DcfService) {}

  /**
   *  Function to get component data
   * @return  Observable<boolean>
   */
  resolve(): Observable<boolean> {
    const quotesData: QuotesGetQuotesListForViewParameters = {
      bmStatusId: 255,
      changedById: 0,
      creatorId: 2737,
      divisionId: '0',
      lastChangedId: 2018,
      ownerId: 2737,
      showFilter: 2,
      //userId: 2737,
    };

    const dcfParams: DCFQueryParams = { componentId: 3043 };

    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteList(quotesData),
        this.dcfService.getDcfList(dcfParams),
        this.getFilterConfig(),
        this.getFilterData(),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition]: [
            QuotesGetQuotesForViewResult,
            DataDefinition,
            boolean,
            boolean
          ]) => {
            this.quotesData = gridData;
            this.dataDefinition = gridDefinition;
            observer.next(true);
            observer.complete();
          }
        );
    });
  }

  getQuoteList(
    data: QuotesGetQuotesListForViewParameters
  ): Observable<QuotesGetQuotesForViewResult> {
    return this.http.post<QuotesGetQuotesForViewResult>(
      environment.QUOTE_LIST_EP,
      data
    );
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
