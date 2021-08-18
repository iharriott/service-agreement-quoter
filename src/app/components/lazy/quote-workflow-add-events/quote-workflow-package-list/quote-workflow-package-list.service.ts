import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { DCFQueryParams } from '../../../../shared/models/dcf.model';

import { DcfService } from '../../../../shared/services/dcf-services/dcf.service';
import { environment } from '../../../../../environments/environment';

import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { PackageListRoot } from './quote-workflow-package-list.model';
import { FormField } from '../../../../shared/models/form-field.model';
import { Emitters } from '../../quote-reports-workflow-by-owner/emitters/emitters';

@Injectable({
  providedIn: 'root'
})
export class QuoteWorkflowPackageListService {
  gridData: PackageListRoot | undefined;
  gridDefinition: DataDefinition | undefined;

  reportFilters: QuoteReportsFilter = Emitters.reportFilter;

  filterConfig: FormField[] | undefined;
  filterData: QuoteReportsFilter | undefined;

  constructor(
    private http: HttpClient,
    private dcfService: DcfService,
  ) { }

  resolve(): Observable<boolean> {
    const quoteReportWorkflowParams: QuoteReportWorkflowParams =
      Emitters.reportParams;

    const dcfParams: DCFQueryParams = { componentId: 3039 };

    //need to remove hardcoding of componentId
    return new Observable<boolean>((observer: Observer<boolean>) => {
      forkJoin([
        this.getQuoteWorkflowPackageList(quoteReportWorkflowParams),
        this.dcfService.getDcfList(dcfParams),
      ])
        .pipe(take(1))
        .subscribe(
          ([gridData, gridDefinition]: [
            PackageListRoot,
            DataDefinition,
          ]) => {
            this.gridData = gridData;
            this.gridDefinition = gridDefinition;
            observer.next(true);
            observer.complete();
          }
        );
    });
  }

  getQuoteWorkflowPackageList(data: QuoteReportWorkflowParams): Observable<PackageListRoot> {
    return this.http.post<PackageListRoot>(environment.QUOTE_WORKFLOW_EP, data);
  }
}
