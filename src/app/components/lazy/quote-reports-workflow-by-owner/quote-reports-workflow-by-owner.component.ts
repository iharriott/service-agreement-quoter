import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import {
  OwnerSummaryRoot,
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from './quote-reports-workflow-by-owner.model';
import { QuoteReportsWorkflowByOwnerService } from './quote-reports-workflow-by-owner.service';

import { SharedFormsConfig } from './quote-reports-workflow-by-owner.model';
import { FormService } from '../../../shared/services/form.service';
import { FormField } from '../../../shared/models/form-field.model';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { Router } from '@angular/router';
import { Emitters } from './emitters/emitters';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';

@Component({
  selector: 'app-quote-reports-workflow-by-owner',
  templateUrl: './quote-reports-workflow-by-owner.component.html',
  styleUrls: ['./quote-reports-workflow-by-owner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteReportsWorkflowByOwnerComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: OwnerSummaryRoot | undefined;

  /*** Child Components ***/

  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteReportsWorkflowByOwnerService: QuoteReportsWorkflowByOwnerService,
    private formService: FormService,
    private router: Router,
    private workflowReportFilterService: WorkflowReportFilterService
  ) {}

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteReportsWorkflowByOwnerService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteReportsWorkflowByOwnerService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig,
      this.sharedFilterConfig
    );

    this.gridData = this.quoteReportsWorkflowByOwnerService.gridDefinition;
    this.tableData = this.quoteReportsWorkflowByOwnerService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.ownerSummary,
    });
  }

  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    const reportParams: QuoteReportWorkflowParams =
      this.workflowReportFilterService.getReportFilterParams(event);

    const reportFilter: QuoteReportsFilter =
      this.workflowReportFilterService.getReportFilter(event);

    Emitters.reportParams = reportParams;
    Emitters.reportFilter = reportFilter;

    this.quoteReportsWorkflowByOwnerService
      .getQuoteReportWorkflowByOwner(reportParams)
      .subscribe((data) => {
        this.tableData = data;

        this.listData$.next({
          isLoaded: true,
          payload: this.tableData?.ownerSummary,
        });
      });
  }

  handleRowClicked(event: any): void {
    Emitters.reportParams.ownerUserId = event.payload.salesRepUserId;
    this.router.navigate(['quote-workflow']);
  }
}
