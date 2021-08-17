import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import {
  SharedFormsConfig,
  StoreSummaryRoot,
} from './quote-reports-workflow-by-store.model';
import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';
import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { FormField } from '../../../shared/models/form-field.model';
import { FormService } from '../../../shared/services/form.service';
import { Router } from '@angular/router';
import { Emitters } from '../quote-reports-workflow-by-owner/emitters/emitters';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';

@Component({
  selector: 'app-quote-reports-workflow-by-store',
  templateUrl: './quote-reports-workflow-by-store.component.html',
  styleUrls: ['./quote-reports-workflow-by-store.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteReportsWorkflowByStoreComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: StoreSummaryRoot | undefined;

  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteReportWorkflowByStoreService: QuoteReportsWorkflowByStoreService,
    private formService: FormService,
    private router: Router,
    private workflowReportFilterService: WorkflowReportFilterService
  ) {}

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteReportWorkflowByStoreService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteReportWorkflowByStoreService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig,
      this.sharedFilterConfig
    );
    this.gridData = this.quoteReportWorkflowByStoreService.gridDefinition;
    this.tableData = this.quoteReportWorkflowByStoreService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.storeSummary,
    });
  }

  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    const reportParams: QuoteReportWorkflowParams =
      this.workflowReportFilterService.getReportFilterParams(event);

    const reportFilter: QuoteReportsFilter =
      this.workflowReportFilterService.getReportFilter(event);

    Emitters.reportParams = reportParams;
    Emitters.reportFilter = reportFilter;
    this.quoteReportWorkflowByStoreService
      .getQuoteReportWorkflowByStore(reportParams)
      .subscribe((data) => {
        this.tableData = data;

        this.listData$.next({
          isLoaded: true,
          payload: this.tableData?.storeSummary,
        });
      });
  }

  handleRowClicked(event: any): void {
    Emitters.reportFilter.branch = event.payload.storeNumber;
    this.router.navigate(['quote-workflow']);
  }
}
